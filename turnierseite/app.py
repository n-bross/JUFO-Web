"""
dependencys im requirements.txt
"""

from flask import Flask, redirect, url_for
from flask_bootstrap import Bootstrap4

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from flask_login import LoginManager
from flask_bcrypt import Bcrypt

from flask_wtf.csrf import CSRFProtect

#zum Aufruf der .env Datei
import os
from dotenv import load_dotenv

db = SQLAlchemy()
bcrypt = Bcrypt()
csrf = CSRFProtect()

def create_app():
    app = Flask(__name__, template_folder='templates')

    #current_dir = os.path.dirname(os.path.abspath('turnierseite.db'))
    #database_file = os.path.join(current_dir, 'instance', 'turnierseite.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///turnierseite.db'# + database_file

    #get the Sekret key from a .env file
    load_dotenv()
    app.secret_key = os.getenv('APP_SECRET_KEY')
    app.config['CSRF_SECRET_KEY'] = os.getenv('CSRF_SECRET_KEY')
    app.config['WTF_CSRF_SECRET_KEY'] = os.getenv('WTF_CSRF_SECRET_KEY')

    #init the Database to use it in the app
    db.init_app(app)

    #add Bootstrap
    bootstrap = Bootstrap4(app)

    #logic to setup login
    login_manager = LoginManager()
    login_manager.init_app(app)

    from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele

    from turnierseite.user_handeling.models import User
    @login_manager.user_loader
    def load_user(uid):
        return User.query.get(uid)

    @login_manager.unauthorized_handler
    def unauthorize_callback():
        return redirect(url_for('core.index'))

    bcrypt.init_app(app)
    csrf.init_app(app)

    # import and register blueprints
    from turnierseite.core.routes import core
    from turnierseite.user_handeling.routes import user_handeling
    #from turnierseite.turnier.routes import turnier
    from turnierseite.turnier.routes.turnier import turnier
    from turnierseite.turnier.routes.gruppe import gruppe
    from turnierseite.turnier.routes.team import team
    from turnierseite.turnier.routes.spiele import spiele

    app.register_blueprint(core, url_prefix='/')
    app.register_blueprint(user_handeling, url_prefix='/user_handeling', bcrypt=bcrypt)
    app.register_blueprint(turnier, url_prefix='/turnier')
    app.register_blueprint(gruppe, url_prefix='/gruppe')
    app.register_blueprint(team, url_prefix='/team')
    app.register_blueprint(spiele, url_prefix='/spiele')

    csrf.exempt(core)
    csrf.exempt(user_handeling)

    migrate = Migrate(app, db)
    return app



