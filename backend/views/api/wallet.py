from flask import render_template, jsonify, current_app, request
from flask_classful import FlaskView, route

from backend.utils.auth import login_required
from backend import db, pynance

class WalletApiView(FlaskView):
    
    decorators = [ ]

    def get(self):
        """Returns wallet balance"""
        data = pynance.wallet.balance()
        return jsonify({
            'status': data.response_info['status_code'],
            'wallet': data.json
        }), 200