How can you design an A/B testing module using Redis that efficiently distributes three layouts (namely layout1, layout2, and layout3) equally among users?
The solution should cater to guest users for whom we don't have any pre-existing identifiers.
The goal is to implement an API that serves these layouts uniformly.

Layouts => 1, 2, 3
Equally among user => Round-Robin
We don't have any pre-existing identifiers => Need to identify users and save id and recognise it
API that serves they layout uniformly.
