import React, { Component } from 'react';
import FormCalc from './Containers/FormCalc'
import { getFormattedAmount } from './Helpers'
import logo from './logo.svg';
import './App.css';
import {Row} from "reactstrap";
const Big = require('big.js');

class App extends Component {
    state = {
        form: {
            sum: 1000000,
            rate: 14,
            term: 10
        },
        monthFee: null,
        overpayment: null,
        amount: null,
    };

    updateForm = (value) => {
        const form = {...this.state.form, ...value};
        this.setState({form});
    };

    getMonthlyFee = () => {
        const {sum, rate, term} = this.state.form;
        //Устанавливаем мин. срок в 1 месяц

        //Расчёт дифференцированного платежа.
        //period количество месяцев.
        const period = +term;
        //S сумма кредита.
        let S = Big(sum);
        //B основная сумма выплаты (делим сумму на количество месяцев) - всегда одинаковая.
        const B = S.div(period);
        //T - полная сумма выплаты по кредиту.
        let T = Big(0);
        // Расчёт оплаты по каждому месяцую.
        for (let i = 0; i < period ; i++) {
            //P - выплата по процентам для этого берём ставку кредита (item.rateFrom) делим
            //на 12 и умножаем оставшуюся сумму кредита.
            const P = Big(rate).div(1200).mul(S);
            S = S.minus(B);
            //P + B = общая выплата за месяц
            //суммируем за каждый месяц
            T = T.plus(P).plus(B);
        }
        const monthFee = T.div(period);
        const overpayment = T.minus(sum);
        this.setState({monthFee, overpayment, amount: sum});
    };

    render() {
        const monthFee = getFormattedAmount(this.state.monthFee, 0);
        const overpayment = getFormattedAmount(this.state.overpayment, 0);
        const fullSum = this.state.overpayment ? getFormattedAmount(this.state.overpayment.plus(this.state.amount), 0) : null;
        return (
            <div>
                <div className="App">
                    <header className="App-header mb-3">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React Calculator</h1>
                    </header>
                </div>

                <div className="container">
                    <Row className="justify-content-center mb-5">
                        <div className="col col-lg-4">
                            <FormCalc
                                form={this.state.form}
                                updateForm={this.updateForm}
                                onSubmit={this.getMonthlyFee}
                            />
                        </div>
                        <div className="col col-lg-4 calculation">
                            <div className="card p-3 mb-3">
                                <p className="mb-0">
                                    Ежемесячный платеж: <span className="float-right">{fullSum}</span>
                                </p>
                            </div>
                            <div className="card p-3 mb-3">
                                <p className="mb-0">
                                    Ежемесячный платеж: <span className="float-right">{monthFee}</span>
                                </p>
                            </div>
                            <div className="card p-3 text-left">
                                <p className="mb-0">
                                    Переплата: <span className="float-right">{overpayment}</span>
                                </p>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

export default App;
