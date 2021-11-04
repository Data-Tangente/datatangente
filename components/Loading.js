import CircularProgress from '@bit/mui-org.material-ui.circular-progress';
import { makeStyles } from '@material-ui/core/styles';

const useStylesFacebook = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      position: 'absolute',
      left: 0,
    },
    top: {
      color: '#f05638',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));

export default function CircularProgressLoading(props) {
    const classes = useStylesFacebook();
    return (
      <div className={classes.root} style={{margin:'5px 30px 0 0'}}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={30}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={30}
          thickness={4}
          {...props}
        />
      </div>
    );
}