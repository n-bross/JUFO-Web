from flask import render_template, request, Blueprint
from flask_login import current_user

import datetime

from turnierseite.turnier.models import Tunier, Gruppe, Team, Spiele

turnier = Blueprint('turnier', __name__, template_folder='templates')


@turnier.route('/')
def index():
    currentYear = datetime.datetime.now().year

    return render_template('turnier/index.html', currentYear=currentYear)