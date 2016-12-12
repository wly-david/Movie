import os
from flask import Flask, request, render_template, g, redirect, Response
from sqlalchemy import *
from sqlalchemy.pool import NullPool


tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)
DATABASEURI = "postgresql://sz2558:zSh940711@w4111vm.eastus.cloudapp.azure.com/w4111"


#
# This line creates a database engine that knows how to connect to the URI above.
#
engine = create_engine(DATABASEURI)


from app import views

