import PeopleList from '../components/people-list';
import { pageTitle } from 'ember-page-title';

//Applies to Scientists page
<template>
{{pageTitle "Scientists"}}

  <PeopleList
    @title="List of Scientists"
    {{!-- Brings in the model from the router --}}
    @people={{@model}} 
  />
  {{outlet}}
</template>
