import PeopleList from '../components/people-list';
import { pageTitle } from 'ember-page-title';

//Applies to Programmers page
<template>
{{pageTitle "Programmers"}}

  <PeopleList
    @title="List of Programmers"
    {{!-- Brings in the model from the router --}}
    @people={{@model}}
  />
  {{outlet}}
</template>

