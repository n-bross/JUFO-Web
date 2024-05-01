from turnierseite.turnier.models import Tunier,Gruppe,Team,Spiele
from turnierseite.user_handeling.models import User


def register_models(app, db):
    @app.route('/')
    def index():
        user = User.query.all()
        return str(user)