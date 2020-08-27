import React, {useState, useEffect, createRef} from 'react'
import {
    Typography,
    Card,
    CardActionArea,
    CardActions,
    Button,
    CardContent,
    CardMedia
} from '@material-ui/core';
import logo from '../../assests/iris.svg'
import useStyles from './style';
import classNames from 'classnames';
const NewsCardChild = ({
    article: {
        description,
        urlToImage,
        publishedAt,
        source,
        title,
        url
    },
    index,
    activeElement
}) => {
    const classes = useStyles();
    const [refElement, setRefElement] = useState([]);
    const scroolToElement = ref => window.scrollTo(0, ref.current.offsetTop - 10);

    useEffect(()=> {
        setRefElement(ref => Array(20).fill().map((_, j) => ref[j] || createRef()));
    }, []);
    useEffect(()=> {
        if(index === activeElement && refElement[activeElement]){
            scroolToElement(refElement[activeElement]);
        }
    }, [index, activeElement, refElement]);

    return (
        <Card ref={refElement[index]} className={classNames(classes.card, activeElement === index ? classes.activeCard : null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || logo}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom="gutterBottom" variant="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More.</Button>
                <Typography variant="h5" color="textSecondary">{index + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCardChild;