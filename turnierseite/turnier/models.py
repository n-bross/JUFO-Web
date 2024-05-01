from turnierseite.app import db

class Tunier(db.Model):
    __tablename__ = 'turnier'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text(100), nullable=False)

    def __repr__(self):
        return self

class Gruppe(db.Model):
    __tablename__ = 'gruppe'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    turnierId = db.Column(db.Integer, db.ForeignKey('turnier.id'))
    name = db.Column(db.Text(100), nullable=False)

    def __repr__(self):
        return self

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    gruppeId = db.Column(db.Integer, db.ForeignKey('gruppe.id'))
    name = db.Column(db.Text(100), nullable=False)
    punkte = db.Column(db.Integer)
    treffer = db.Column(db.Integer)
    gegentreffer = db.Column(db.Integer)

    def __repr__(self):
        return self

class Spiele(db.Model):
    __tablename__ = 'spiele'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    team1Id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team2Id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    gespielt = db.Column(db.Text(1))
    runde = db.Column(db.Integer)
    toreT1 = db.Column(db.Integer)
    toreT2 = db.Column(db.Integer)

    def __repr__(self):
        return self

