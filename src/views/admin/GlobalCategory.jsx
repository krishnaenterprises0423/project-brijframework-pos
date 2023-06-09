import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddGlobalCategory from './Modals/AddGlobalCategory';
import EditItemModal from './Modals/EditGlobalCategory';
import UpdateItemModal from './Modals/UpdateGlobalCategory';
import { RegularCard, ItemsTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../Loader';

import { getAllItems, addGlobalCategory } from '../../actions';

class GlobalCategory extends Component {
    state = {
        notificationGroup: 'add',
        showAddItemModal: false,
        showEditItemModal: false,
        showUpdateItemModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getAllItems();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Logo','Iden No.','Item Name','Retail Price', 'Purchase Price', 'Stock Qnt', 
            'Create Dt','Updated Dt', 'Actions']
            : ['Logo','Iden No.','Item Name','Retail Price', 'Purchase Price', 'Stock Qnt', 
            'Created Dt','Updated Dt', 'Actions']
    };

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);

        setTimeout(function() {
            x[place] = false;
            this.setState(x);
        }.bind(this), 3000);
    }

    notificationMessage = type => {
        if (type === 'success') {
            if (this.state.notificationGroup === 'add') {
                return 'Item added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'Item edited successfully';
            } else {
                return 'Item updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error Item could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error Item could not be added';
            } else {
                return 'Error Item could not be updated';
            }
        }
    };

    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            padIt
                            cardTitle="Items"
                            cardSubtitle="This is a list of all items in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addItemButton }
                                        onClick={() => this.setState({ showAddItemModal: true, notificationGroup: 'add' })}>ADD ITEM</Button>
                                )
                            }
                            content={
                                <ItemsTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.items}
                                    editItem={() => this.setState({ showEditItemModal: true, notificationGroup: 'edit' })}
                                    updateItem={() => this.setState({ showUpdateItemModal: true, notificationGroup: 'update' })}
                                />
                            }
                        />
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tr"
                                    color="success"
                                    icon={AddAlert}
                                    message={this.notificationMessage('success')}
                                    open={this.state.tr}
                                    closeNotification={() => this.setState({'tr': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tc"
                                    color="danger"
                                    icon={AddAlert}
                                    message={this.notificationMessage('error')}
                                    open={this.state.tc}
                                    closeNotification={() => this.setState({'tc': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <AddGlobalCategory
                    open={this.state.showAddItemModal}
                    close={() => this.setState({ showAddItemModal: false })}
                    addGlobalCategory={this.props.addGlobalCategory}
                    refresh={this.props.getAllItems}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditItemModal
                    open={this.state.showEditItemModal}
                    close={() => this.setState({ showEditItemModal: false })}
                    refresh={this.props.getAllItems}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateItemModal
                    open={this.state.showUpdateItemModal}
                    close={() => this.setState({ showUpdateItemModal: false })}
                    refresh={this.props.getAllItems}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_item_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.users;
    const { items, show_item_loader } = state.items;

    return { user, items, show_item_loader };
};

const styles = {
    addItemButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getAllItems, addGlobalCategory })(GlobalCategory);
