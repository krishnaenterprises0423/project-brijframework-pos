import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { tableStyle } from 'variables/styles';

import { renderJackpotToEdit, deleteJackpot } from '../../actions';

class CustomTable extends React.Component {
    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true;//this.props.user.role.name === 'super_admin';
    };

    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    _renderToEdit = prop => {
        this.props.renderJackpotToEdit(prop);
        this.props.editJackpot();
    }

    deleteJackpot = id => {
        if (window.confirm("Are you sure you want to delete this Jackpot transaction?")) {
            this.props.deleteJackpot(id, this.props.getJackpots);
        }
    };

    _renderTableData = () => {
        let number = 0;
        const { classes, tableData } = this.props;

        return tableData.map((prop, key) => {
            return (
                <TableRow key={key}>
                    <TableCell className={classes.tableCell}>
                            { ++number }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.name }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { `GHS ${prop.amount}` }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.created_at) }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.updated_at) }
                    </TableCell>
                    {
                        this.isSuperAdmin() && (
                            <TableCell className={classes.tableCell}>
                                <Button style={ styles.updateButton } onClick={() => this._renderToEdit(prop)}>Edit</Button>
                                <Button style={ styles.deleteButton } onClick={() => this.deleteJackpot(prop.id)} >Delete</Button>
                            </TableCell>
                        )
                    }
                </TableRow>
            );
        })
    };

    render() {
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
        
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {
                        tableHead !== undefined && (
                            <TableHead className={classes[tableHeaderColor+"TableHeader"]}>
                                <TableRow>
                                    {
                                        tableHead.map((prop, key) => {
                                            return (
                                                <TableCell
                                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                                    key={key}>
                                                    {prop}
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                        )
                    }

                    {
                        tableData && (
                            <TableBody>
                                { this._renderTableData() }
                            </TableBody>
                        )
                    }
                </Table>
            </div>
        );
    }
}

CustomTable.defaultProps = {
    tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.object)
};

const styles = {
    updateButton: {
        color: 'purple',
        textTransform: 'lowercase'
    },
    deleteButton: {
        color: 'red',
        textTransform: 'lowercase'
    }
};

const wrappedTable = withStyles(tableStyle)(CustomTable);

const mapStateToProps = state => {
    const { user } = state.users;
    return { user };
};

export default connect(mapStateToProps, { renderJackpotToEdit, deleteJackpot })(wrappedTable);
