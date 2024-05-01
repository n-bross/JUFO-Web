from flask import render_template, request, Blueprint
from flask_login import current_user

import datetime


core = Blueprint('core', __name__, template_folder='templates')


@core.route('/')
def index():
    currentYear = datetime.datetime.now().year

    return render_template('core/index.html', currentYear=currentYear)