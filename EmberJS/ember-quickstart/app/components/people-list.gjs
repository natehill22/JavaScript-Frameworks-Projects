import { on } from '@ember/modifier'; //Handles click events
import { fn } from '@ember/helper'; //Allows the Person to be passed to the event handler as an argument
import { tracked } from '@glimmer/tracking'; //Keeps state in an Ember component
import Component from '@glimmer/component'; //Keeps state in an Ember component

export default class extends Component {
  @tracked currentPerson; //Ember watches this variable, re-renders when the value changes

  //Updates this instance's currentPerson as the selected person
  showPerson = (person) => {
    this.currentPerson = person;
  };

  //Returns true if currentPerson matches currently selected person
  isCurrentPerson = (person) => {
    return this.currentPerson === person;
  };

  <template>
    <h2>{{@title}}</h2>

    <ul>
      {{!-- Shows each person in the array --}}
      {{#each @people as |person|}}
        <li>
        {{!-- When clicked, assign selected person to the showPerson function --}}
          <button type="button" {{on "click" (fn this.showPerson person) }}>{{person}}</button>
          {{!-- If currently selected person matches currentPerson, render the emoji to the right of the person --}}
            {{#if (this.isCurrentPerson person) }}
              ⬅️
            {{/if}}
        </li>
      {{/each}}
    </ul>
  </template>
}