from flask import Blueprint, render_template

auth_bp = Blueprint('auth', __name__, template_folder='templates', static_folder='static')

@auth_bp.route('/login')
def login():
    return render_template('auth/login.html')