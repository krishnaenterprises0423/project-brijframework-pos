import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { RegularCard, Button, CustomInput, ItemGrid } from 'components';

import { emailChanged, passwordChanged, login } from '../../actions';

class Authenticate extends Component {
    _onChangeEmail = event => {
        this.props.emailChanged(event.target.value);
    };

    _onChangePassword = event => {
        this.props.passwordChanged(event.target.value);
    };

    _onClick = () => {
        const { email, password } = this.props;

        if (!email || !password || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return;
        }

        this.props.login({ email, password }, this._clearCredentials);
    };

    // Callback function to clear user's credentials after successful login.
    _clearCredentials = () => {
        this.props.emailChanged('');
        this.props.passwordChanged('');
    };

    render() {
        return (
            <div>
                <Grid container justify="center" alignItems="center" style={styles.container}>
                    <ItemGrid xs={12} sm={4} md={4}>
                        <RegularCard
                            cardTitle="LOG IN"
                            cardSubtitle="Log in to your account"
                            style={styles.container}
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Email address"
                                                id="email-address"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="email"
                                                onChange={this._onChangeEmail}
                                                defaultValue={this.props.email}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Password"
                                                id="password"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="password"
                                                onChange={this._onChangePassword}
                                                defaultValue={this.props.password}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                </div>
                            }
                            
                            footer={
                                <Button color="primary" onClick={this._onClick}>Log in</Button>
                            }
                        />
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

const styles = {
    container: {
        paddingTop: '50px',
    }
};

const mapStateToProps = state => {
    const { email, password } = state.users;
    return { email, password }; 
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, login })(Authenticate);