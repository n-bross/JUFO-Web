import datetime

from turnierseite.app import db

class Turnier(db.Model):
    __tablename__ = 'turnier'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text(100), nullable=False, unique=True)
    datumDerAustragung = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<Turnier id={self.id} name={self.name} datumDerAustragung={self.datumDerAustragung}>"

    def __str__(self):
        return f"Turnier(id={self.id}, name={self.name}, datumDerAustragung={self.datumDerAustragung})"


class Gruppe(db.Model):
    __tablename__ = 'gruppe'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    turnierId = db.Column(db.Integer, db.ForeignKey('turnier.id', name='fk_gruppe_turnier'))
    name = db.Column(db.Text(100), nullable=False)

    def __repr__(self):
        return f"<Gruppe id={self.id} name={self.name} turnierId={self.turnierId}>"

    def __str__(self):
        return f"Gruppe(id={self.id}, name={self.name}, turnierId={self.turnierId})"

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    gruppeId = db.Column(db.Integer, db.ForeignKey('gruppe.id', name='fk_team_gruppe'))
    name = db.Column(db.Text(100), nullable=False)
    punkte = db.Column(db.Integer)
    treffer = db.Column(db.Integer)
    gegentreffer = db.Column(db.Integer)

    def __repr__(self):
        return f"<Team id={self.id} name={self.name} gruppeId={self.gruppeId} punkte={self.punkte} treffer={self.treffer} gegentreffer={self.gegentreffer}>"

    def __str__(self):
        return f"Team(id={self.id}, name={self.name}, gruppeId={self.gruppeId}, punkte={self.punkte}, treffer={self.treffer}, gegentreffer={self.gegentreffer})"


class Spiele(db.Model):
    __tablename__ = 'spiele'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    gruppeId = db.Column(db.Integer, db.ForeignKey('gruppe.id', name='fk_spiele_gruppe'))
    team1Id = db.Column(db.Integer, db.ForeignKey('teams.id', name='fk_spiele_team1'))
    team1Name = db.Column(db.Text(100), nullable=False)
    team2Id = db.Column(db.Integer, db.ForeignKey('teams.id', name='fk_spiele_team2'))
    team2Name = db.Column(db.Text(100), nullable=False)
    gespielt = db.Column(db.Text(1))
    runde = db.Column(db.Integer)
    toreT1 = db.Column(db.Integer)
    toreT2 = db.Column(db.Integer)

    def __repr__(self):
        return f"<Spiele id={self.id} team1Id={self.team1Id} team1Name={self.team1Name} team2Id={self.team2Id} team2Name={self.team2Name} gespielt={self.gespielt} runde={self.runde} toreT1={self.toreT1} toreT2={self.toreT2}>"

    def __str__(self):
        return f"Spiele(id={self.id}, team1Id={self.team1Id}, team1Name={self.team1Name}, team2Id={self.team2Id}, team2Name={self.team2Name}, gespielt={self.gespielt}, runde={self.runde}, toreT1={self.toreT1}, toreT2={self.toreT2})"