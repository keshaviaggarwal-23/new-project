import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  search: {
    "& > *": {
      margin: theme.spacing(0.5),
      width: "257px",
      height: "56px",
      backgroundColor: "#a5a3a0",
      color: "white",
    },
  },
  paper: {
    backgroundColor: "#111340",

    paddingTop: "12px",
    paddingLeft: "15px",
  },

  headingColor: {
    color: "white",
  },
  countColor: {
    color: "yellow",
    fontSize: "20px",
    marginTop: "5px",
  },
}));

const SidePane=()=> {
  const style = useStyles();

  const dataSet = [
    {
      name: "Monica",
      age: "25",
    },
    {
      name: "Rachel",
      age: "25",
    },
    {
      name: "Phoebe",
      age: "27",
    },
    {
      name: "Chandler",
      age: "27",
    },
    {
      name: "Ross",
      age: "27",
    },
    {
      name: "Joey",
      age: "29",
    },
  ];

  return (
    <>
      <article>
        <form className={style.search}>
          <TextField label="Search Here!" variant="filled" />
        </form>
      </article>

      <artticle>
        {dataSet.map((item) => (
          <div className={style.root}>
            <Paper className={style.paper} elevation={5}>
              <Grid container spacing={2}>
                <Grid item container>
                  <Grid direction="column" spacing={2}>
                    <Grid>
                      <Typography
                        gutterBottom
                        variant="h6"
                        className={style.headingColor}
                      >
                        <span>{item.name}</span>

                        <div className={style.countColor}>{item.age}</div>
                      </Typography>
                      <br />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <hr />
          </div>
        ))}
      </artticle>
    </>
  );
}

export default SidePane;
