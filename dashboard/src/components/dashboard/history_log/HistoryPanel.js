import React, { Component } from 'react';

import * as historyService from '../../../services/status';

import Panel from '../../commons/Panel';
import HistoryList from './HistoryList';
import Spinner from '../../commons/Spinner';

class HistoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        histories: [],
        isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchHistories();
  }

  /**
   * Fetch list of histories.
   *
   * @returns {Promise}
   */
  async fetchHistories() {
    try {
      let histories = await historyService.fetchServiceHistories();
      
      this.setState({ isLoading: false, histories });
    } catch (err) {
      // TODO: Show error messages
    }
  }

  render() {
      
      let { isLoading, histories } = this.state;

      if(isLoading) {
        return (
          <Spinner /> 
        );
      }
      
      return (
        <Panel title='History Logs' className='status-up'>
          <HistoryList histories={histories} />
        </Panel>
      );
  }
}

export default HistoryPanel;