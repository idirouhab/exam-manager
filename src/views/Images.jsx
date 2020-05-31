import React, {Fragment, useEffect, useState} from "react";
import Loader from "../components/Loader/Loader";
import Slide from "@material-ui/core/Slide";
import ImageProvider from "../providers/image";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/styles";
import {useTranslation} from "react-i18next";
import Image from "../components/Images/Image";
import ExamProvider from "../providers/exam";

const StyledTableCell = withStyles(() => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

export default function Images() {
    const {t} = useTranslation("common");
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [exams, setExams] = useState([]);


    const getExams = () => {
        ExamProvider.fetchExams().then(exams => setExams(exams))
    };

    useEffect(getExams, []);

    const getImages = () => {
        ImageProvider.fetchImages()
            .then(images => {
                exams.forEach(exam => {
                        let questionList = exam.questions.filter(question => {
                            return question.image
                        });

                        let imageArraylist = questionList.map(question => {
                            return question.image
                        });
                        if (questionList.length > 0) {
                            for (let i in images) {
                                if (imageArraylist.includes(images[i].id)) {

                                    images[i].examTitle = exam.text;
                                }
                            }
                        }
                    }
                );
                setImages(images)
            })
            .finally(() => setLoading(false));
    };
    useEffect(() => {

        if (exams.length > 0) {
            getImages()
        }
    }, [exams])

    const deleteImage = (id) => {
        ImageProvider.deleteImage(id).then(getImages);
    };

    return (
        <>
            <Fragment>
                <Slide direction="up" mountOnEnter unmountOnExit in={!loading}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="capitalize">{t('id')}</TableCell>
                                            <TableCell className="capitalize">{t('exam')}</TableCell>
                                            <TableCell className="capitalize">{t('size')}</TableCell>
                                            <StyledTableCell size="small" align="center"/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {images.map((image, key) => (
                                            <Image
                                                key={key}
                                                image={image}
                                                index={key}
                                                deleteImage={deleteImage}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                </Slide>
                {loading && (<Loader/>)}
            </Fragment>
        </>
    );
}
