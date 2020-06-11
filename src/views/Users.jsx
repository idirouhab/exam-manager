import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader/Loader";
import UserProvider from "../providers/user";
import User from "../components/Users/User";

const StyledTableCell = withStyles(() => ({
  head: {
    width: "5%",
  },
  body: {
    width: "5%",
  },
}))(TableCell);

export default function Users () {
  const { t } = useTranslation();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = useState(true);

  const deleteUser = (id) => {
    UserProvider.deleteUser(id).then(() => {
      getUsers();
    });
  };

  const getUsers = () => {
    UserProvider.fetchUsers().then(data => {
      let users = [];
      data.forEach(user => {
        users.push(
          {
            id: user.id,
            role: user.role,
            email: user.email,
            isBlocked: user.isBlocked,
            isVerified: user.isVerified,
          }
        );
      });
      setUsers(users);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(getUsers, []);

  const update = (userId, e, fieldName) => {
    setLoading(true);
    const checked = e.target.checked;
    const oldUsers = [...users];
    const data = {};
    data[fieldName] = e.target.checked;

    UserProvider.updateUser(userId, data).then(() => {
      const newUsers = oldUsers.map(user => {
        if (user.id === userId) {
          user[fieldName] = checked;
        }
        return user;
      });
      setUsers(newUsers);
      setLoading(false);
    });
  };

  return (
    <>
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="capitalize">{t("Banned")}</TableCell>
                    <TableCell className="capitalize">{t("Verified")}</TableCell>
                    <TableCell className="capitalize">{t("role")}</TableCell>
                    <TableCell className="capitalize">{t("email")}</TableCell>
                    <StyledTableCell size="small" align="center"/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, key) => (
                    <User
                      key={key}
                      user={user}
                      deleteUser={deleteUser}
                      update={update}
                      index={key}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {loading && (<Loader/>)}
      </Fragment>
      {loading && <Loader/>}
    </>
  );
}
