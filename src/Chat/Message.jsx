import { Fragment } from "react";
import { auth } from "../firebase";

const styles = {
    message: {
        paddingTop: '14px'
    },
    date: {
        paddingTop: '7px',
        fontSize: 'small',
        color: 'slategrey',
    }
}

const currentUserStyle= {
    ...styles.message,
    textAlign: 'right'
}
const otherUserStyle = {
    ...styles.message,
    textAlign: 'left'
}

function format(date) {
    let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    formattedDate += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formattedDate;
}

const Message = (props) => {
    const { content, from, timeStamp } = props;

    const dateStr = format(new Date(timeStamp));
    const split = content.split("\\n");
    return (
        <div style={from === auth.currentUser.uid ? currentUserStyle : otherUserStyle}>
            {split.map((value, index) => {
                return (
                    <Fragment key={index}>
                        {value}
                        <br />
                    </Fragment>
                );
            })}
            <div style={styles.date}>{dateStr}</div>
        </div>
    );
}

export default Message;