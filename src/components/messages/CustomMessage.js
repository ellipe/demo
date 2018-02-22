import React from 'react';
import {Message, Segment, Icon} from 'semantic-ui-react';

class CustomMessage extends React.Component {
    render() {
        return (
            <Segment>
                <Message icon warning>
                <Icon name="announcement" />
                <Message.Content>
                <Message.Header>Estás a un paso de visualizar tus resultados</Message.Header>
                <p>Por favor, selecciona una orden.</p>
                </Message.Content>
            </Message>
			</Segment>
        );
    }
}

export default CustomMessage;