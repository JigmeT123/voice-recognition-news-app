import React from 'react'
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
    return (
        <Card className={classNames(classes.card, activeElement === index ? classes.activeCard : null)}>
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
