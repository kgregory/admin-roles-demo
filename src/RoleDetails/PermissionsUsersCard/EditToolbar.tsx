import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import stickyStyles from "core/utils/stickyStyles";
import delay from "core/utils/delay";

interface EditToolbarProps {
  editTitle: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave?: () => void;
  sticky?: boolean;
}

const useEditToolbarStyles = makeStyles((theme) => ({
  grow: {
    flex: 1
  },
  progress: (sticky: boolean) => ({
    ...stickyStyles(theme, { sticky, stuckToolbars: 2 })
  }),
  toolbar: (sticky: boolean) => ({
    // better consistency with highlight mode
    "& > button:first-child": {
      marginLeft: -8
    },
    "& > button:last-child": {
      marginRight: -8
    },
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    ...stickyStyles(theme, { sticky })
  }),
  highlight: () => ({
    "& > button:first-child": {
      // aligns close button with checkboxes
      marginLeft: -14
    },
    "& > button:last-child": {
      marginRight: -12
    },
    ...(theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        })
  })
}));

const EditToolbar = ({
  editTitle,
  isEditing,
  onToggleEdit,
  onSave = onToggleEdit,
  sticky = false
}: EditToolbarProps) => {
  const classes = useEditToolbarStyles(sticky);
  const [loading, setLoading] = React.useState(false);

  // just for seeing options
  const isIconEditButton = false;

  const handleSave = async () => {
    if (editTitle !== "0 changed") {
      setLoading(true);
      await delay(3000);
      setLoading(false);
    }
    onSave();
  };

  return (
    <>
      <Toolbar
        className={clsx(classes.toolbar, {
          [classes.highlight]: isEditing
        })}
      >
        {isEditing ? (
          <>
            <IconButton
              disabled={loading}
              edge="start"
              onClick={() => onToggleEdit()}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
            {editTitle != null ? (
              <Typography
                className={classes.grow}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {editTitle}
              </Typography>
            ) : (
              <div className={classes.grow} />
            )}
            <Button
              disabled={loading}
              color="inherit"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </>
        ) : isIconEditButton ? (
          <IconButton edge="end" onClick={() => onToggleEdit()} color="inherit">
            <EditIcon />
          </IconButton>
        ) : (
          <Button startIcon={<EditIcon />} onClick={() => onToggleEdit()}>
            Edit
          </Button>
        )}
      </Toolbar>
      {loading && (
        <LinearProgress color="secondary" className={classes.progress} />
      )}
    </>
  );
};

export default EditToolbar;
