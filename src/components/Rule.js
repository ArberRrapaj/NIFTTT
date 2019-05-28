import React from 'react'

class Rule extends React.Component {
  state = {
    "rules":[{
      "id": 1,
      "name": "Like my GFs pic after random time",
      "automations": 34,
      "used_integrations": ["instagram"]
    },
    {
      "id": 2,
      "name": "Autolike my own tweets :P",
      "automations": 12,
      "used_integrations": ["twitter"]
    },
    {
      "id": 3,
      "name": "Respond thanks to every comment",
      "automations": 28,
      "used_integrations": ["instagram"]
    }],
    "selectedRule":{}
  }

  render(){
    var selectedRule = this.state.rules.filter(rule => rule.id == this.props.match.params.id)[0];
    console.log(selectedRule);

    return(
      <div>
        <p>showing rule {selectedRule.id}.</p>
      </div>
    )
  }
}

export default Rule;
