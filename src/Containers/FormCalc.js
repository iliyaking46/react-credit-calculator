import React, { Component } from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class FormCalc extends Component {
    updateSum = (sum) => {
        this.props.updateForm({sum: +sum});
    };

    updateRate = (rate) => {
        this.props.updateForm({rate: +rate});
    };

    updateTerm = (term) => {
        this.props.updateForm({term: +term});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('frefs');
        this.props.onSubmit();
    };

    render() {
        return (
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label for="cash">Сумма</Label>
                    <Input
                        type="text"
                        placeholder="Сумма"
                        value={this.props.form.sum}
                        onChange={(e) => this.updateSum(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="percent">Процентная ставка</Label>
                    <Input
                        type="text"
                        placeholder="Проценты"
                        value={this.props.form.rate}
                        onChange={(e) => this.updateRate(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="percent">Срок (мес)</Label>
                    <Input
                        type="text"
                        placeholder="Срок"
                        value={this.props.form.term}
                        onChange={(e) => this.updateTerm(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <div className="col text-center">
                        <Button
                            type="submit"
                            color="primary"
                        >
                            Посчитать
                        </Button>
                    </div>
                </FormGroup>
            </Form>
        )
    }
}

export default FormCalc;