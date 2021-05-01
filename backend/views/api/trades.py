from flask import render_template, jsonify, current_app, request
from flask_classful import FlaskView, route

from backend.utils.auth import login_required
from backend import db, pynance

class TradesApiView(FlaskView):
    
    decorators = [ ]

    def get(self):
        """Loads the current configuration and loads it into the store in the frontend.
        The user can change the values and save the changes to confirm the changes.

        Returns:
            [dict]: {
                'assets': [A list of available assets from Binance],
                'symbols': [The selected symbols to trade],
                'symbols-choices': [A list of available symbols from Binance],
                'timeframe-choices': [A list of available graph time frames],
                'timeframe': Returns a string representing the selected timeframe,
                'candle-interval': Returns an integer which represents the selected candle-interval,
                'wallet-amount': Returns an integer which is the total amount of % available free coins to use when placing buy orders,
                'below-average': Returns an integer which pushes the lowest average x% lower,
                'profit-margin': Returns an integer which represent the profit % used for sell orders,
                'profit-as': Is used to calculate all profit as the selected asset
            }
        """
        symbols = [i['symbol'] for i in pynance.assets.symbols().json]
        assets = [i['coin'] for i in pynance.wallet.balance().json]
        from backend.models.config import ConfigModel
        config = ConfigModel.query.first()
        if config is None:
            config = ConfigModel()
            db.session.add(config)
            db.session.commit()
        return jsonify({
            'assets': assets,
            'symbols': config.symbols,
            'symbols-choices': symbols,
            'timeframe-choices': ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'],
            'timeframe': config.timeframe,
            'candle-interval': config.candle_interval,
            'wallet-amount': config.wallet_amount,
            'below-average': config.below_average,
            'profit-margin': config.profit_margin,
            'profit-as': config.profit_as
        }), 200