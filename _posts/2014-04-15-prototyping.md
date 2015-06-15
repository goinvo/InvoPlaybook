---
layout: post
title: Prototyping
---

## Determine the Purpose
When starting to work on a prototype, it is important that the client and the Involution team are clear on the purpose of the prototyping endeavor.

* Validate and improve the design
* Sell the design to customers
* Identify technical feasibility

Based on the purpose, you need to take different approaches.

### Goal: Validate and Improve the Design
If your goal is to validate and improve the design, it is important to focus on rapid iteration. There is a lot of value in prototyping as part of the design process. It forces the design team to think about micro-interactions (i.e. hover states, transitions, labels) that they might have overlooked while designing on paper. It also lets you experience a design in its native format. Some designs that looks great on paper fail horribly when they start living and breathing.

If the goal is really to let the design team (including the client's core team) validate and iterate on the design, then the prototype might not need to be as polish or as complete. For instance, if evaluating a workflow, you might not need to implement each of the steps in order to evaluate the success or failure of the design. In some cases, though, these steps might be critical to evaluating the success or failure of a design.

Some of the best prototypes in this scenario have razor-sharp focus on specific areas of functionality. You can save a lot of time by building a bunch of small prototypes rather than one large prototype. 
### Goal: Sell the Design to Customers or the Organization
Oftentimes, a client needs help **communicating** the new design throughout their own organization or to their customers. Prototypes can be a great way to achieve this. In some cases, our clients' sales teams have used our prototypes to sell the future of the product while the production system is still in development.

When building a prototype with the goal of the client using it for demos to customers, **it is critical to work with the client to define the story or stories they will tell while using the prototype**. When scoping the prototype, the story will be used to decide what is critical to nail, what can be faked, and what doesn't need to be included.

### Goal: Identify Technical Feasibility
If your goal is to test the technical feasibility of a design (or a portion of a design), it is important to make sure you have a good understanding of what the final technology stack might look like. Is there an API? Is it a native application? It is going to be built in the style of a single page application?

## Determine the Scope


## Technical Questions
* What language will your prototype be written in?
* Will the prototype be driven off of static data files or by a server and database?
* What library are you using for binding data to templates (i.e. something static like [Mustache](https://mustache.github.io/) or [Handlebars](http://handlebarsjs.com/); or something more dynamic like [React](https://facebook.github.io/react/) or [Knockout](http://knockoutjs.com/))? You should organize your templates into separate files. If it is a client side library, how will you handle loading these templates dynamically?
* If you are using CSS, are you using [SCSS](http://sass-lang.com/) (or an equivalent)? (the answer should be "yes")
* What libraries are you using? Consider a MV* such as [AngularJS](https://angularjs.org/), [Ember](http://emberjs.com/), or  [Backbone](http://backbonejs.org/). Also consider UI libraries like [Bootstrap](http://getbootstrap.com/) or [Skeleton](http://getskeleton.com/). There's a new one of these each week, so look around a bit.


## General Rules
* When possible, you should try to make prototypes driven by separate data files. **The separation of data from the views will make it easier to update the styling/layouts later as well as make it easier to update the contents of the data files.** This applies both to the actual models as well as to things like navigation. 
* Choose a framework that minimizes development overhead. When choosing a prototyping framework consider the up front costs of setting up the framework as well as the costs of updating the design or extending the prototype in the future. **Choosing the right framework can speed up iteration**
* Choose a framework that is as close as possible to what will be used in the final production system. If you are prototyping a native iOS application, consider building it as a native iOS application or at least use a framework which compiles to native code. **This will lead to a more realistic prototype and help to identify technical constraints**. This sometimes will be in conflict with the decision to use the framework with the least overhead. 

## Common Pitfalls
### Incorrectly Attributing Feedback
Sometimes clients (or Invoites) see a prototype that is a bit laggy or doesn't quite feel right and take it as a failure in the design. When incorporating feedback from a prototype, it is important to understand the root cause of the feedback. For instance, if someone is having trouble using inline editing, it could be because inline editing doesn't make sense in this context or it could be because the specific code implementation of the inline editing isn't right. It is easy to incorrectly evaluate feedback on a prototype and end up making bad design decisions.

It isn't that the feedback isn't valid... it just indicates where a little more attention might need to be focused. For instance, if the feedback loops (for submitting items) feel laggy in a prototype, it might mean that you need to pay more attention in how the saving of items is handled in the production application.

### Mistaking the Prototype's Performance for the Expected Production Performance

### Focusing on Details that Don't Matter
The scope of prototypes can explode if you focus on details that don't matter. When you are building a prototype, you need to constantly ask whether what you are working on adds value *towards the goal of the prototype*. If it doesn't, it might not need to be implemented or it might be able to be faked.

### Not Enough Technical Architecture
You don't want to spend too long on technical architecture for the prototype, but if you don't spend enough time you will find yourself with a fragile and stapled together system which is hard to maintain. Some common pitfalls with this:
* Not separating the data from the templates, resulting in a lot of wasted time updating details of the different pages.
* Not considering reusability of controllers or templates
* Not identifying how content will get loading

## Data
When someone is evaluating a design they use the data as well as the design elements in the screen to understand the design. As such, it is important that your prototype contains real data which tells a story.

### Properties of Real Data
In your prototypes it is important to use real (or at least realistic) data. The best option is to have get real data from the client. In cases where this isn't available, you can craft a dataset. 

#### Real Data has an average and distribution
At the most basic level, you can take a look at the 

* Real Data is layered
* Real Data has a story
* How to gather it
* How to store it (also be careful about keeping private stuff private)
* Why it is important
