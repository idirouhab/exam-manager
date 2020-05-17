import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

export default function Submit(props) {
    const {t} = useTranslation('common');
    return (
        <>
            <Card className="cardPaper">
                <CardContent>
                    <Typography variant="h4" align={"center"} gutterBottom>
                        <strong>{t('your_score')}: {props.score}/{props.totalQuestion}</strong><br/>
                        <span>{t('time')}: {props.seconds} {t('seconds')}</span>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
