import {
  IonItem,
  IonLabel,
} from '@ionic/react';
import { V1ReplicationController } from '@kubernetes/client-node'
import React from 'react';
import { RouteComponentProps } from 'react-router';

import ItemStatus from '../ItemStatus';

interface IReplicationControllerItemProps extends RouteComponentProps {
  item: V1ReplicationController;
  section: string;
  type: string;
}

const ReplicationControllerItem: React.FunctionComponent<IReplicationControllerItemProps> = ({
  item,
  section,
  type,
}) => {
  let status = '';

  if (item.status) {
    if (
      item.status.replicas === 0
      || item.status.replicas === (item.status.readyReplicas && item.status.availableReplicas)
    ) {
      status = 'success';
    } else if (item.status.replicas !== (item.status.readyReplicas || item.status.availableReplicas)) {
      status = 'danger';
    } else {
      status = 'warning';
    }
  }

  return (
    <IonItem routerLink={`/kubernetes/${section}/${type}/${item.metadata ? item.metadata.namespace : ''}/${item.metadata ? item.metadata.name : ''}`} routerDirection="forward">
      <ItemStatus status={status} />
      <IonLabel>
        <h2>{item.metadata ? item.metadata.name : ''}</h2>
        <p>Namespace: {item.metadata ? item.metadata.namespace : '-'}</p>
      </IonLabel>
    </IonItem>
  )
};

export default ReplicationControllerItem;
