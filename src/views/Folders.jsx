import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import CreateFolderModal from "../components/Folders/CreateFolderModal";
import FolderProvider from "../providers/folder";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FolderService from "../services/folderService";

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  listItem: {
    cursor: "pointer",
    textAlign: "center",
  },
  paperHeader: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
}));

export default function Folders (props) {

  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = Boolean(anchorEl);

  const handleClick = (event, folderId) => {
    setSelectedFolderId(folderId);
    setAnchorEl(event.currentTarget);

  };

  const handleCloseAnchor = (e) => {
    let attribute = e.target.getAttribute("value");

    if (attribute === "Delete") {
      FolderProvider.deleteFolder(selectedFolderId).then(() => {
          getFolders();
        }
      );
    }
    setSelectedFolderId(false);
    setAnchorEl(null);
  };

  const getFolders = () => {
    FolderService.getFolders().then(folders => setFolders(folders));
  };

  useEffect(() => {
    getFolders();
  }, [open]);

  const createFolder = (folder) => {
    FolderProvider.saveFolder(folder).then(() => {
      setOpen(false);
    });
  };

  const getTagString = (tags) => {
    let arrayTags = tags.map((tag, index) => {
      return <Chip key={`chip_${index}`} className={classes.chip} size="small" label={tag.name}/>;
    });
    return arrayTags;
  };

  const goToRoute = (folderId) => {
    props.history.push(`/admin/folders/${folderId}`);
  };
  const classes = useStyles();
  const { t } = useTranslation("common");

  const options = [
    {
      action: "Delete",
      value: t("delete")
    }
  ];

  return (
    <Fragment>
      <Grid container spacing={3}>
        {folders.map((folder, index) => {
          return <Grid item xs={3} key={index}>
            <Paper className={classes.paper}>
              <div style={{ textAlign: "right" }}>
                <IconButton style={{ margin: "0", padding: "0" }}
                            onClick={(e) => handleClick(e, folder.id)}>
                  <MoreVertIcon/>
                </IconButton>
              </div>
              <List dense={false} className={classes.listItem}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    onClick={e => goToRoute(folder.id)}
                    style={{ textDecoration: "none", color: "inherit", textAlign: "center" }}
                    primary={folder.name}
                    secondary={getTagString(folder.tags)}
                    secondaryTypographyProps={{ component: "span" }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>;
        })}
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <List dense={false} className={classes.listItem}
            >
              <ListItem>
                <ListItemText
                  style={{ textAlign: "center" }}
                  primary={<IconButton aria-label="delete" className={classes.green}
                                       onClick={handleClickOpen}>
                    <Add fontSize="large"/>
                  </IconButton>}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <CreateFolderModal createFolder={createFolder} open={open} handleClose={handleClose}/>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openAnchor}
        onClose={handleCloseAnchor}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.action} value={option.action}
                    onClick={handleCloseAnchor}>
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

