import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function Submit(props) {
    return (
        <>
            <Card className="cardPaper">
                <CardContent>
                    <Typography variant="h4" align={"center"} gutterBottom>
                        <strong>Your score: {props.score}/{props.totalQuestion}</strong><br/>
                        <span>timer: {props.seconds} s</span>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
