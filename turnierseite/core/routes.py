from flask import render_template, Blueprint, session
from flask_login import current_user
from sqlalchemy import text
import datetime

from turnierseite.app import db

from turnierseite.turnier.models import Turnier


core = Blueprint('core', __name__, template_folder='templates')

@core.route('/')
def index():
    try:
        #alle_turniere = Turnier.query.all()
        alle_turniere = db.session.execute(text('SELECT * FROM turnier ORDER BY datumDerAustragung DESC'))
        return render_template('core/index.html', alle_turniere=alle_turniere)
    except Exception as e:
        # Handle the exception, print or log the error message
        print("Error executing SQL query:", str(e))
        return render_template('error.html', message="An error occurred while retrieving data.")
