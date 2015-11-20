var React = require('react');
var Time = require('react-time');
var Router = require('react-router');

// material ui
var mui = require('material-ui');

var List = mui.List;
var ListItem = mui.ListItem;
var ListDivider = mui.ListDivider;
var FontIcon = mui.FontIcon;


var SelectedImage = React.createClass({
  _handleLinkClick: function(model) {
    var filters = "model="+model;
    filters = encodeURIComponent(filters);
    this.context.router.transitionTo("/devices/:groupId/:filters", {groupId:1, filters: filters}, null);
  },
  _clickImageSchedule: function() {
    this.props.openSchedule("schedule", this.props.selected);
  },
  render: function() {
    var info = {name: "-", tags: ['-'], model: "-", build_date: "-", upload_date: "-", size: "-", checksum: "-", devices: "-"};
    if (this.props.selected) {
      for (var key in this.props.selected) {
        info[key] = this.props.selected[key];
        if (key.indexOf("date")!==-1) {
          info[key] = (
            <Time style={{position:"relative", top:"4"}} value={this.props.selected[key]} format="YYYY/MM/DD HH:mm" />
          )
        }
      }
    }
    return (
      <div id="imageInfo" className={this.props.selected ? null : "muted"}>
        <h3>Image details</h3>
        <div className="report-list">
          <List>
            <ListItem disabled={true} primaryText="Software" secondaryText={info.name} />
            <ListDivider />
            <ListItem disabled={true} primaryText="Tags" secondaryText={info.tags.join(', ')} />
            <ListDivider />
            <ListItem disabled={this.props.selected ? false : true} primaryText="Device type" secondaryText={info.model} onClick={this._handleLinkClick.bind(null, info.model)} />
            <ListDivider />
          </List>
        </div>
        <div className="report-list">
          <List>
            <ListItem disabled={true} primaryText="Date built" secondaryText={info.build_date} />
            <ListDivider />
            <ListItem disabled={true} primaryText="Date uploaded" secondaryText={info.upload_date} />
            <ListDivider />
            <ListItem disabled={true} primaryText="Size" secondaryText={info.size} />
            <ListDivider />
          </List>
        </div>
        <div className="report-list" style={{width: "320"}}>
          <List>
            <ListItem disabled={true} primaryText="Checksum" secondaryTextLines={2} style={{wordWrap:"break-word"}} secondaryText={info.checksum} />
            <ListDivider />
            <ListItem disabled={true} primaryText="Installed on devices" secondaryText={info.devices ? info.devices : "-"} />
            <ListDivider />
          </List>
        </div>
        <div className="margin-top">
          <div className="report-list" style={{padding:"16", width:"560", verticalAlign:"top"}}>
            <span style={{fontSize:"16", color:"rgba(0,0,0,0.8)"}}>Description</span>
            <p style={{color:"rgba(0,0,0,0.54)"}}>{info.description}</p>
          </div>
          <div className="report-list" style={{width:"320"}}>
            <List>
              <ListItem
                disabled={this.props.selected ? false : true}
                primaryText="Schedule update"
                secondaryText="Create an update with this image"
                onClick={this._clickImageSchedule}
                leftIcon={<FontIcon className="material-icons">schedule</FontIcon>} />
              <ListDivider />
            </List>
          </div>
        </div>
      </div>
    );
  }
});

SelectedImage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = SelectedImage;


        