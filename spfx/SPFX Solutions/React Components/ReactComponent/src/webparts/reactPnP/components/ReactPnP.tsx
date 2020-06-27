import * as React from 'react';
import styles from './ReactPnP.module.scss';
import { IReactPnPProps } from './IReactPnPProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp, List, Item, ItemAddResult, ItemUpdateResult } from 'sp-pnp-js';

export default class ReactPnP extends React.Component<IReactPnPProps, {}> {
  state={
    data: null
  }

  public componentDidMount(){
    // fetch("www.google.com").then(function(rows){
    //   this.setState({data: rows})
    // });
    sp.web.lists.getByTitle("Students").items.getById(5).get().then((item: any) => {
              console.log(item);
              this.setState({data: item})
              console.log("data= ",this.state.data)
              debugger
            })
  }
  public render(): React.ReactElement<IReactPnPProps> {
    return (
      <div className={ styles.reactPnP }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <h2>Data = {JSON.stringify(this.state.data)}</h2>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
