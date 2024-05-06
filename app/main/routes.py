from flask import Blueprint, render_template
from flask import Flask

main_bp = Blueprint('main', __name__, template_folder='templates', static_folder='static')

app = Flask(__name__, static_folder='static')
@main_bp.route('/')
def index():
    items = [
        {'cabID': '222', 'shijian': '122d', 'final_result': '222', 'info': '22', 'image_path': 'path_to_image1'},
        {'cabID': '223', 'shijian': '123d', 'final_result': '223', 'info': '23', 'image_path': 'path_to_image2'},
        # 可以添加更多的字典项
    ]
    return render_template('main/index.html', items =items )

@main_bp.route('/notepad')
def notepad():
    return render_template('main/notepad.html')

