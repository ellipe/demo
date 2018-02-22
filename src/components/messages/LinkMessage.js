import React from 'react';
import {Message, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class LinkMessage extends React.Component {
    render() {
        const {page, header, link, text} = this.props;
        return (

                <Message icon>
                <Icon name="announcement" />
                <Message.Content>
                <Message.Header>{header}</Message.Header>
                <p>{text}</p>
                {link && (<p>Presiona clic <Link to={link}>aquí</Link> para ir a la página de {page}</p>)}
                </Message.Content>
            </Message>

        );
    }
}

LinkMessage.propTypes = {
    header: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default LinkMessage;