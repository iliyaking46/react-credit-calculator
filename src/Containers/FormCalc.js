import React, { Component } from "react";
import Select from 'react-select';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import 'react-select/dist/react-select.css';

class FormCalc extends Component {
    getRates = () => {
        const options = [];
        for(let i=9, len=18; i<len; i+=0.5) {
            options.push({
                label: `${i+1}`,
                value: `${i+1}`
            });
        }
        return options;
    };

    updateSum = (value) => {
        const sum = parseInt(value, 10);
        this.props.updateForm({sum: isNaN(sum) ? 0 : sum});
    };

    updateRate = (value) => {
        const rate = value;
        this.props.updateForm({rate: isNaN(rate) ? 0 : rate});
        this.props.onSubmit();
    };

    updateTerm = (value) => {
        const term = parseInt(value, 10);
        this.props.updateForm({term: isNaN(term) ? 0 : term});
    };

    handleSubmit = (e) => {
        e.preventDefault();
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
                {/*<FormGroup>*/}
                    {/*<Label for="percent">Процентная ставка</Label>*/}
                    {/*<Input*/}
                        {/*type="text"*/}
                        {/*placeholder="Проценты"*/}
                        {/*value={this.props.form.rate}*/}
                        {/*onChange={(e) => this.updateRate(e.target.value)}*/}
                    {/*/>*/}
                {/*</FormGroup>*/}
                <FormGroup>
                    <Label>Процентная ставка</Label>
                    <Select
                        options={this.getRates()}
                        value={this.props.form.rate}
                        simpleValue
                        onChange={this.updateRate}
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