from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import Flask, flash, session, abort, request, render_template, g, redirect, Response
from app import app
from sqlalchemy.orm import sessionmaker

DATABASEURI = "postgresql://"


#
# This line creates a database engine that knows how to connect to the URI above.
#
engine = create_engine(DATABASEURI)

#engine.execute("""CREATE TABLE IF NOT EXISTS profile (
#    username text,
#    password text
#    );""")
#engine.execute("""INSERT INTO profile(username, password) VALUES ('admin@gmail.com', 'password');""")


def before_request():
    """
        This function is run at the beginning of every web request
        (every time you enter an address in the web browser).
        We use it to setup a database connection that can be used throughout the request.
        
        The variable g is globally accessible.
    """
    try:
        g.conn = engine.connect()
    except:
        print "uh oh, problem connecting to database"
        import traceback; traceback.print_exc()
        g.conn = None

@app.teardown_request
def teardown_request(exception):
    """
        At the end of the web request, this makes sure to close the database connection.
        If you don't, the database could run out of memory!
    """
    try:
        g.conn.close()
    except Exception as e:
        pass

#
# @app.route is a decorator around index() that means:
#   run index() whenever the user tries to access the "/" path using a GET request
#
# If you wanted the user to go to, for example, localhost:8111/foobar/ with POST or GET then you could use:
#
#       @app.route("/foobar/", methods=["POST", "GET"])
#
# PROTIP: (the trailing / in the path is important)
#
# see for routing: http://flask.pocoo.org/docs/0.10/quickstart/#routing
# see for decorators: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/
#
@app.route('/')
def index():
    """
    request is a special object that Flask provides to access web request information:
        
    request.method:   "GET" or "POST"
    request.form:     if the browser submitted a form, this contains the data in the form
    request.args:     dictionary of URL arguments, e.g., {a:1, b:2} for http://localhost?a=1&b=2
        
    See its API: http://flask.pocoo.org/docs/0.10/api/#incoming-request-data
    """
            
    # DEBUG: this is debugging code to see what request looks like
    print request.args
    #
    # example of a database query
    #
    #cursor = g.conn.execute("SELECT name FROM test")
    
    #for result in cursor:
    #    names.append(result['name'])  # can also be accessed using result[0]
    #cursor.close()
    cursor = engine.connect().execute("SELECT mname, AVG(score) FROM RateMovie NATURAL JOIN Movies GROUP BY mname ORDER BY AVG(score) DESC LIMIT 10;;")
    names = []
    scores = []
    for result in cursor:
        names.append(result[0])  # can also be accessed using result[0]
        scores.append(result[1])
    cursor.close()

    cursor = engine.connect().execute("SELECT aname, COUNT(username) FROM LikeActor NATURAL JOIN Actors GROUP BY aname ORDER BY COUNT(username) DESC LIMIT 10;;")
    actors = []
    likeactors = []
    for result in cursor:
        actors.append(result[0])  # can also be accessed using result[0]
        likeactors.append(result[1])
    cursor.close()
    
    cursor = engine.connect().execute("SELECT name, mname, COUNT(username) FROM LikeCharacter NATURAL JOIN Characters NATURAL JOIN Movies GROUP BY mname, name ORDER BY COUNT(username) DESC LIMIT 10;;")
    characters = []
    for result in cursor:
        characters.append(result[0]+ " in "+result[1])  # can also be accessed using result[0]
    cursor.close()

    context = dict(movie = names, actor = actors, character = characters)
    return render_template("index.html", **context)

@app.route('/signup')
def signup():
    return render_template("signup.html")

@app.route('/signupConfirm', methods=['POST'])
def signupconfirm():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])
    cursor = engine.connect().execute("SELECT username FROM Users WHERE username=\'"+POST_USERNAME+"\'")
    names = []
    for result in cursor:
        names.append(result['username'])
    if len(names)>0:
        flash('Email already exist', 'error')
        print('Email already exist')
        return render_template("signup.html")
    else:
        engine.connect().execute("INSERT INTO Users(username, profile, password) VALUES (\'"+POST_USERNAME+"\', \'\', \'"+POST_PASSWORD+"\');")
        session['username'] = POST_USERNAME
        session['logged_in'] = True
        return redirect("/")
    

@app.route('/login', methods=['POST'])
def do_admin_login():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])
    print(POST_PASSWORD)
    cursor = engine.connect().execute("SELECT username, password FROM Users WHERE username=\'"+POST_USERNAME+"\'")
    names = []
    for result in cursor:
        names.append(str(result['password'].strip()))
    print(names)
    if str(POST_PASSWORD) in names:
        session['username'] = request.form['username']
        session['logged_in'] = True
        return redirect("/")
    else:
        flash('Invalid password provided', 'error')
        return index()
        

@app.route('/logout', methods=['GET'])
def logout():
    session['logged_in'] = False
    return redirect("/")


#### Search Part
@app.route('/search.js', methods=['GET'])
def loadsearchJS():
  return render_template('search.js')
  
@app.route('/movies', methods=['POST'])
def searchMovie():
  rec = request.form['record']
  conditionType = request.form['conditionType']
  if conditionType == 'none' :
    command = "Select t1.*, avg(t4.score) from Movies t1, ratemovie t4 where t1.mid = t4.mid Group by t1.mid Order by avg(t4.score) DESC"
    print command
  if conditionType == 'attribute' :
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select t1.*, avg(t4.score) from Movies t1, ratemovie t4 where t1." + attribute + " ~ '.*" + value +".*' and t1.mid = t4.mid Group by t1.mid Order by avg(t4.score) DESC"
    else :
      command = "Select t1.*, avg(t4.score) from Movies t1, ratemovie t4 where t1." + attribute + " = " + value + " and  t1.mid = t4.mid Group by t1.mid Order by avg(t4.score) DESC"
    print command
  if conditionType == 'relation' :
    relation_table = request.form['relation_table']
    search_table = request.form['search_table']
    search_key = request.form['search_key']
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select t1.*, avg(t4.score) from Movies t1, ratemovie t4, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.mid = t2.mid and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " ~ '.*" + value +".*' and t1.mid = t4.mid Group by t1.mid Order by avg(t4.score) DESC"
    else :
      command = "Select t1.*, avg(t4.score) from Movies t1, ratemovie t4, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.mid = t2.mid and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " = " + value + " and  t1.mid = t4.mid Group by t1.mid Order by avg(t4.score) DESC"
    print command
  cursor = engine.connect().execute(command)
  datas = []
  attributes = ['mid','mname','dname','genres','running time','box office earnings','date', 'score']
  for result in cursor:
    datax = []
    for i in range(0,8):
      datax.append(result[i])  # can also be accessed using result[0]
    for i in range(2, len(attributes)):
      datax[i]=attributes[i]+": "+str(datax[i])
    datas.append(datax)
  cursor.close()
  # print datas
  context = dict(Title = 'Movies', data = datas, record = rec)
  return render_template("result.html", **context)

@app.route('/characters', methods=['POST'])
def searchCharacter():
  rec = request.form['record']
  print rec
  conditionType = request.form['conditionType']
  if conditionType == 'none' :
    command = "Select distinct t1.*, t4.aname, t5.mname from characters t1, actors t4, movies t5 where t1.aid = t4.aid and t1.mid = t5.mid"
    print command
  if conditionType == 'attribute' :
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.*, t4.aname, t5.mname from characters t1, actors t4, movies t5 where t1.aid = t4.aid and t1.mid = t5.mid and t1." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.*, t4.aname, t5.mname from characters t1, actors t4, movies t5 where t1.aid = t4.aid and t1.mid = t5.mid and t1." + attribute + " = " + value
    print command
  if conditionType == 'relation' :
    relation_table = request.form['relation_table']
    search_table = request.form['search_table']
    search_key = request.form['search_key']
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.*, t4.aname, t5.mname from characters t1, " + relation_table +" t2, " + search_table \
              + " t3, actors t4, movies t5 Where t1.aid = t4.aid and t1.mid = t5.mid and t1.cid = t2.cid and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.*, t4.aname, t5.mname from characters t1, " + relation_table +" t2, " + search_table \
              + " t3, actors t4, movies t5 Where t1.aid = t4.aid and t1.mid = t5.mid and t1.cid = t2.cid and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " = " + value
    print command
  cursor = engine.connect().execute(command)
  datas = []
  attributes = ['cid','name','gender','introduction','role importance','actor name', 'movie name']
  for result in cursor:
    datax = []
    datax.append(result[0])
    for i in range(3,9):
      datax.append(result[i])  # can also be accessed using result[0]
    for i in range(2, len(attributes)):
      datax[i]=attributes[i]+": "+str(datax[i])
    datas.append(datax)
  cursor.close()
  # print datas
  context = dict(Title = 'Characters', data = datas, record = rec)
  return render_template("result.html", **context)

@app.route('/actors', methods=['POST'])
def searchActors():
  rec = request.form['record']
  print rec
  conditionType = request.form['conditionType']
  if conditionType == 'none' :
    command = "Select distinct t1.* from actors t1"
    print command
  if conditionType == 'attribute' :
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from actors t1 where t1." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from actors t1 where t1." + attribute + " = " + value
    print command
  if conditionType == 'relation' :
    relation_table = request.form['relation_table']
    search_table = request.form['search_table']
    search_key = request.form['search_key']
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from actors t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.aid = t2.aid and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from actors t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.aid = t2.aid and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " = " + value
    print command
  cursor = engine.connect().execute(command)
  datas = []
  attributes = ['aid','aname','gender','birthday','birthplace','tag','introduction']
  for result in cursor:
    datax = []
    for i in range(0,7):
      datax.append(result[i])  # can also be accessed using result[0]
    for i in range(2, len(attributes)):
      datax[i]=attributes[i]+": "+str(datax[i])
    datas.append(datax)
  cursor.close()
  # print datas
  context = dict(Title = 'Actors', data = datas, record = rec)
  return render_template("result.html", **context)

@app.route('/directors', methods=['POST'])
def searchDirectors():
  rec = request.form['record']
  print rec
  conditionType = request.form['conditionType']
  if conditionType == 'none' :
    command = "Select distinct t1.* from directors t1"
    print command
  if conditionType == 'attribute' :
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from directors t1 where t1." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from directors t1 where t1." + attribute + " = " + value
    print command
  if conditionType == 'relation' :
    relation_table = request.form['relation_table']
    search_table = request.form['search_table']
    search_key = request.form['search_key']
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from directors t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.dname = t2.dname and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from directors t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.dname = t2.dname and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " = " + value
    print command
  cursor = engine.connect().execute(command)
  datas = []
  attributes = ['dname','dname','gender','birthday','birthplace','introduction']
  for result in cursor:
    datax = []
    datax.append(result[0]) 
    for i in range(0,5):
      datax.append(result[i])  # can also be accessed using result[0]
    for i in range(2, len(attributes)):
      datax[i]=attributes[i]+": "+str(datax[i])
    datas.append(datax)
  cursor.close()
  # print datas
  context = dict(Title = 'Directors', data = datas, record = rec)
  return render_template("result.html", **context)  

@app.route('/studios', methods=['POST'])
def searchStudios():
  rec = request.form['record']
  print rec
  conditionType = request.form['conditionType']
  if conditionType == 'none' :
    command = "Select distinct t1.* from studios t1"
    print command
  if conditionType == 'attribute' :
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from studios t1 where t1." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from studios t1 where t1." + attribute + " = " + value
    print command
  if conditionType == 'relation' :
    relation_table = request.form['relation_table']
    search_table = request.form['search_table']
    search_key = request.form['search_key']
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from studios t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.sname = t2.sname and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from studios t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.sname = t2.sname and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " = " + value
    print command
  cursor = engine.connect().execute(command)
  datas = []
  attributes = ['sname','sname','country','founder','location','founded date']
  for result in cursor:
    datax = []
    datax.append(result[0]) 
    for i in range(0,5):
      datax.append(result[i])  # can also be accessed using result[0]
    for i in range(2, len(attributes)):
      datax[i]=attributes[i]+": "+str(datax[i])
    datas.append(datax)
  cursor.close()
  # print datas
  context = dict(Title = 'Studios', data = datas, record = rec)
  return render_template("result.html", **context)  


@app.route('/awards', methods=['POST'])
def searchAwards():
  rec = request.form['record']
  print rec
  conditionType = request.form['conditionType']
  if conditionType == 'none' :
    command = "Select distinct t1.* from awards t1"
    print command
  if conditionType == 'attribute' :
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from awards t1 where t1." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from awards t1 where t1." + attribute + " = " + value
    print command
  if conditionType == 'relation' :
    relation_table = request.form['relation_table']
    search_table = request.form['search_table']
    search_key = request.form['search_key']
    attribute = request.form['attribute']
    value = request.form['value']
    if not value.isnumeric() :
      command = "Select distinct t1.* from awards t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.awname = t2.awname and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " ~ '.*" + value +".*'"
    else :
      command = "Select distinct t1.* from awards t1, " + relation_table +" t2, " + search_table \
              + " t3 Where t1.awname = t2.awname and t2." + search_key + " = t3."+ search_key + " and t3." + attribute + " = " + value
    print command
  cursor = engine.connect().execute(command)
  datas = []
  attributes = ['awname','awname','organization','country','start date']
  for result in cursor:
    datax = []
    datax.append(result[0]) 
    for i in range(0,4):
      datax.append(result[i])  # can also be accessed using result[0]
    for i in range(2, len(attributes)):
      datax[i]=attributes[i]+": "+str(datax[i])
    datas.append(datax)
  cursor.close()
  # print datas
  context = dict(Title = 'Awards', data = datas, record = rec)
  return render_template("result.html", **context)    

# Example of adding new data to the database
@app.route('/rateIt', methods=['POST'])
def add():
    print(request.form['score'])
    print(request.form['id'])
    username = request.form['uname']
    id = request.form['id']
    cursor = engine.connect().execute("SELECT username FROM RateMovie WHERE username=\'"+username+"\' AND mid=\'"+id+"\'")
    names = []
    for result in cursor:
        names.append(result['username'])
    cursor.close()
    if len(names)==0:
        engine.connect().execute("INSERT INTO RateMovie(username, mid, score) VALUES (\'"+username+"\', \'"+request.form['id']+"\', \'"+request.form['score']+"\');")
    else:
        flash('You\'ve already rated it before','error')
    return redirect('/')

@app.route('/likeCharacter', methods=['POST'])
def addlike():
    username = request.form['uname']
    id = request.form['id']
    cursor = engine.connect().execute("SELECT username FROM LikeCharacter WHERE username=\'"+username+"\' AND cid=\'"+id+"\'")
    names = []
    for result in cursor:
        names.append(result['username'])
    cursor.close()
    if len(names)==0:
        engine.connect().execute("INSERT INTO LikeCharacter(username, cid) VALUES (\'"+username+"\', \'"+request.form['id']+"\');")
    else:
        flash('You\'ve already liked it before','error')
    return redirect('/')

@app.route('/likeActor', methods=['POST'])
def addlikeActor():
    username = request.form['uname']
    id = request.form['id']
    cursor = engine.connect().execute("SELECT username FROM LikeActor WHERE username=\'"+username+"\' AND aid=\'"+id+"\'")
    names = []
    for result in cursor:
        names.append(result['username'])
        print(result['username'])
    cursor.close()
    if len(names)==0:
        engine.connect().execute("INSERT INTO LikeActor(username, aid) VALUES (\'"+username+"\', \'"+request.form['id']+"\');")
    else:
        flash('You\'ve already liked it before','error')
    return redirect('/')


