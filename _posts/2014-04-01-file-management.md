---
layout: post
title: File Management
---

We use Dropbox so backups are automated, file-sharing is easy, and all of our work is accessible to the entire organization.

## Default Project Directory Structure

When starting a new project, use this [dropbox structure](https://www.dropbox.com/sh/4hqpdnf5nkquexu/AADJZTKqxU8hqhkZkCH8MWgva?dl=0) as your starting point.

``` html
/Invo_Projects	 
  /ClientName	 
    /client	 
      /background 	
      /research	 
    /design	 
      /deliverables	 
      /production	 
        /images   
      /research	 
```

`Invo_Projects`   
Every project we work on exists here. Any documents you place here are visible to the entire organization.

`ClientName`  
Contains all the projects for a specific client. You'll be working inside of this directory.

`client`  
All material received from the client. It's helpful to place documents received via email, basecamp, etc, in Dropbox for a central location for all.

`background`  
Any information from the client to understand the business, industry, product.

`research`  
Any research provided by the client.

`design`  
All material created by Invo.

`deliverables`  
All material we've delivered to the client. Typically PDFs, but can also include spreadsheets, PSDs, prototypes, and other documents that make sense.

`production`  
All files used to create our deliverables. Typically InDesign, Photoshop, Illustator, Omnigraffle, Sketch, Keynote, or other files used to create. Prototypes could also live here if for some reason storing on Github doesn't make sense.

`research`  
Any research Invo has done.

Use subfolders at your discretion if you're needing another level of organization than the default structure provided.

## Good Project Directory Example

Using project directory template. Files in logical location. Design documents are logically named and versioned.

``` html
/Invo_Projects	 
  /Johnson&Johnson	 
    /client	 
      /background 	
        401-Tech Training IV - Smartphone - Mobile Health Manager.pdf   
        Care4Today Mental Health Solutions-for overview with Involution.pptx  
      /research	 
        HIMSS_Foundation_Patient_Engagement_Framework.pdf
        Infographic-Continuity-of-Care.pdf  
        schizophrenia-demotraphic-summary.pdf
    /design	 
      /deliverables	
        jnj_icb_careplan_flow_v01.pdf  
        jnj_icb_clinician_dashboard_draft.pdf 
        jnj_icb_clinician_dashboard_v01.pdf  
        jnj_icb_clinician_dashboard_v02.pdf  
        jnj_icb_clinician_dashboard_v03.pdf  
        jnj_icb_patient_onboarding_workflow_draft.pdf  
        jnj_icb_patient_onboarding_workflow_v01.pdf  
        jnj_icb_schizophrenia_careplan_v01.pdf   
      /production	 
        jnj_icb_design_v01.indd   
        jnj_icb_design_v02.indd   
        jnj_icb_design_v03.indd   
        jnj_icb_engagement_models_v01.indd  
        jnj_icb_engagement_models_v02.indd  
        /images
          9023177644_69bb4ef2b4_o.png   
          activity_large.jpg  
          education.png   
      /research	 
        APJMR_2014-2-071-libre.pdf  
        CognitiveDefectSchizophrenia_TechRemediation.pdf  
        knee_hip_replacement_discharge_planning_checklist.pdf
```

## Multiple Projects Directory Structure for a Single Client

``` html
/Invo_Projects   
  /ClientName  
    /ProjectName1
      /client  
        /background   
        /research  
      /design  
        /deliverables  
        /production  
          /images   
        /research 
    /ProjectName2
      /client  
        /background   
        /research  
      /design  
        /deliverables  
        /production  
          /images   
        /research  
```

`ProjectName1`  
Use a logical name that defines the project.

## Multiple Phases Project Directory Structure

``` html
/Invo_Projects   
  /ClientName  
    /client  
      /background   
      /research  
    /design  
      /phase1
        /deliverables  
        /production  
          /images   
        /research  
      /phase2
        /deliverables  
        /production  
          /images   
        /research  
```

Rarely needed. Use your discretion. This can be flexible for phases or weeks.

## Filenaming Convention

Minimally use for our production files and deliverables.

`clientname` + `_` + `projectname` + `_` + `descriptive_deliverable_name` + `_` + `v` + `versionnumber`

Each piece of the name is connected with an underscore `_` and is written in lowercase. A version number should look like `v01` and not `v1`. It's acceptable to append `_draft` after the version number if it's an incomplete document.

Good Example:  
`jnj_icb_engagement_models_v02.indd`  
`jnj_icb_careplan_flow_v01.pdf`   
`jnj_icb_careplan_flow_v01_draft.pdf`

Bad Example:  
`engagement.indd`   
`Careplan_Flow_v01.pdf`   
`Careplan_Flow_DRAFT.pdf`
