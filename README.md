## **COVID-19 State Comparison**
When I first created the chart in late March, there weren't many resources comparing states by "cases per capita" or by "days of outbreak". My goal was to create a fair comparison among all the states, so we could better isolate factors in each outbreak.

COVID-19 data has been freely provided by the New York Times.

**There are two charts:** 
1. Line chart - three different parameter choices:
	* Cases/1000 - number of cases per 1000 people in a state population
	* Total cases (log chart) - total number of cases. Log chart is used to better illustrate change in number of cases.
	* New Cases - daily new cases by day of outbreak.
2. Gapminder chart - measures cases vs. deaths for all states over the first 105 days of outbreak ("date" of "day 1" varies by state). There are a number of parameter and filter choices.

- Both charts have filter options to quickly see the outbreak in different regions, populations, etc.
- There are options to save the chart as a PNG file, and "light mode" for a printer-friendly version. WARNING: currently, changing to "light mode" will re-render the chart.

### **Data sources**
1. State COVID-19 data: New York Times
2. State population: U.S. Census Bureau
3. State GDP: Bureau of Economic Analysis (BEA) 
	*Gross domestic product (GDP) by state: All industry total (Millions of current dollars)

### **License:**
You may freely explore and share these charts, but please credit the source: 
Data is from the New York Times, based on reports from state and local agencies.

### **Notes:**
Day of first case = Day 1. Date of Day 1 may be different for different states. 
Although Washington and California had isolated cases since January, the first case of US community spread was reported on 2/26/20.
Including January would lengthen the days since first case in Washington and California, possibly overstating the effectiveness of their policies.

<<<<<<< HEAD
I am not a health expert or statistician. This is a personal project and should not be cited without additional institutional or scientific research, but I hope it adds a new perspective and encourages data exploration. 
=======
We have used this data to power our [maps](https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html) and [reporting](https://www.nytimes.com/coronavirus) tracking the outbreak, and it is now being made available to the public in response to requests from researchers, scientists and government officials who would like access to the data to better understand the outbreak.

The data begins with the first reported coronavirus case in Washington State on Jan. 21, 2020. We will publish regular updates to the data in this repository. 

## Live and Historical Data

We are providing two sets of data with cumulative counts of coronavirus cases and deaths: one with our most current numbers for each geography and another with historical data showing the tally for each day for each geography.

The historical data files are at the top level of the directory and contain data up to, but not including the current day. The live data files are in the [live/](live/) directory.

A key difference between the historical and live files is that the numbers in the historical files are the final counts at the end of each day, while the live files have figures that may be a partial count released during the day but cannot necessarily be considered the final, end-of-day tally.

The historical and live data are released in three files, one for each of these geographic levels: U.S., states and counties.
 
Each row of data reports the cumulative number of coronavirus cases and deaths based on our best reporting up to the moment we publish an update. Our counts include both laboratory confirmed and probable cases using [criteria](https://int.nyt.com/data/documenthelper/6908-cste-interim-20-id-01-covid-19/85d47e89b637cd643d50/optimized/full.pdf) that were developed by states and the federal government. Not all geographies are reporting probable cases and yet others are providing confirmed and probable as a single total. Please [read here](https://github.com/nytimes/covid-19-data/blob/master/PROBABLE-CASES-NOTE.md) for a full discussion of this issue.

We do our best to revise earlier entries in the data when we receive new information. If a county is not listed for a date, then there were zero reported confirmed cases and deaths.

State and county files contain [FIPS codes](https://www.census.gov/quickfacts/fact/note/US/fips), a standard geographic identifier, to make it easier for an analyst to combine this data with other data sets like a map file or population data.

Download all the data or clone this repository by clicking the green "Clone or download" button above.

---

### Historical Data

#### U.S. National-Level Data

The daily number of cases and deaths nationwide, including states, U.S. territories and the District of Columbia, can be found in the [us.csv](us.csv) file.  ([Raw CSV file here.](https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv))

```
date,cases,deaths
2020-01-21,1,0
...
```

#### State-Level Data

State-level data can be found in the [states.csv](us-states.csv) file. ([Raw CSV file here.](https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv))

```
date,state,fips,cases,deaths
2020-01-21,Washington,53,1,0
...
```

#### County-Level Data

County-level data can be found in the [counties.csv](us-counties.csv) file. ([Raw CSV file here.](https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv))

```
date,county,state,fips,cases,deaths
2020-01-21,Snohomish,Washington,53061,1,0
...
```

In some cases, the geographies where cases are reported do not map to standard county boundaries. See the list of [geographic exceptions](#geographic-exceptions) for more detail on these.

---

### Live Data

The files in the [live/](live/) directory are also available at three geographic levels and contain all the fields the historical data files have, but with only data for the current day. We try to update these files multiple times per day. 

Because these are updated throughout the day, they can have inconsistent counts, are more likely to contain errors, and should be considered less reliable than the historical data. Different areas of the country update at different times and our data collection process can move at a different pace as well.

In addition to the columns that are in the historical files, these files also include new columns that include detail on the number of confirmed and probable cases, separately.

In the live files, the case and death fields have the following definitions:

* **cases**: The total number of cases of Covid-19, including both confirmed and probable.
* **deaths**: The total number of deaths from Covid-19, including both confirmed and probable.
* **confirmed_cases**: The number of laboratory confirmed Covid-19 cases only, or blank if not available.
* **confirmed_deaths**: The number of laboratory confirmed Covid-19 deaths only, or blank if not available.
* **probable_cases**: The number of probable Covid-19 cases only, or blank if not available.
* **probable_deaths**: The number of probable Covid-19 deaths only, or blank if not available.

We understand this breakout would also be valuable historically, and are working toward providing that. Please bear with us as we roll out this new and more complicated data.

The live data can be found in files at the U.S. level in the [us.csv](live/us.csv) file, at the state level in the [states.csv](live/us-states.csv) file, and at the county level in the [counties.csv](live/us-counties.csv) file.


## Methodology and Definitions

The data is the product of dozens of journalists working across several time zones to monitor news conferences, analyze data releases and seek clarification from public officials on how they categorize cases. 

It is also a response to a fragmented American public health system in which overwhelmed public servants at the state, county and territorial level have sometimes struggled to report information accurately, consistently and speedily. On several occasions, officials have corrected information hours or days after first reporting it. At times, cases have disappeared from a local government database, or officials have moved a patient first identified in one state or county to another, often with no explanation. In those instances, which have become more common as the number of cases has grown, our team has made every effort to update the data to reflect the most current, accurate information while ensuring that every known case is counted.

When the information is available, we count patients where they are being treated, not necessarily where they live.

In most instances, the process of recording cases has been straightforward. But because of the patchwork of reporting methods for this data across more than 50 state and territorial governments and hundreds of local health departments, our journalists sometimes had to make difficult interpretations about how to count and record cases.

For those reasons, our data will in some cases not exactly match with the information reported by states and counties. Those differences include these cases: When the federal government arranged flights to the United States for Americans exposed to the coronavirus in China and Japan, our team recorded those cases in the states where the patients subsequently were treated, even though local health departments generally did not. When a resident of Florida died in Los Angeles, we recorded her death as having occurred in California rather than Florida, though officials in Florida counted her case in their own records. And when officials in some states reported new cases without immediately identifying where the patients were being treated, we attempted to add information about their locations later, once it became available.

* "Probable" and “Confirmed Cases and Deaths

Cases and deaths can be reported as either “confirmed” or “probable.” Our total cases and deaths include both. The number of cases includes all cases, including those who have since recovered or died.

On April 5, the Council of State and Territorial Epidemiologists [advised states](https://int.nyt.com/data/documenthelper/6908-cste-interim-20-id-01-covid-19/85d47e89b637cd643d50/optimized/full.pdf) to include both confirmed cases, based on confirmatory laboratory testing, and probable cases, based on specific criteria for testing, symptoms and exposure. The Centers for Disease Control adopted these definitions and national CDC data began including confirmed and probable cases on April 14.

Some governments continue to report only confirmed cases, while others are reporting both confirmed and probable numbers. And there is also another set of governments that is reporting the two types of numbers combined without providing a way to separate the confirmed from the probable.

The Geographic Exceptions section below has more details on specific areas. The methodology of individual states changes frequently.

* Confirmed Cases

Confirmed cases are counts of individuals whose coronavirus infections were confirmed by a laboratory test and reported by a federal, state, territorial or local government agency. Only tests that detect viral RNA in a sample are considered confirmatory. These are often called molecular or RT-PCR tests.

* Probable Cases

Probable cases count individuals who did not have a confirmed test but were evaluated by public health officials using criteria developed by states and the federal government and reported by a health department.

Public health officials consider laboratory, epidemiological, clinical and vital records evidence.
Tests that detect antigens or antibodies are considered evidence towards a “probable” case, but are not sufficient on their own, according to the Council of State and Territorial Epidemiologists.

* Confirmed Deaths

Confirmed deaths are individuals who have died and meet the definition for a confirmed Covid-19 case. Some states reconcile these records with death certificates to remove deaths from their count where Covid-19 is not listed as the cause of death. We follow health departments in removing non-Covid-19 deaths among confirmed cases when we have information to unambiguously know the deaths were not due to Covid-19, i.e. in cases of homicide, suicide, car crash or drug overdose.

* “Probable” Deaths

Probable deaths are deaths where Covid-19 is listed on the death certificate as the cause of death or a significant contributing condition, but where there has been no positive confirmatory laboratory test.

Deaths among probable cases tracked by a state or local health department where a death certificate has not yet been filed may also be counted as a probable death.

For more on how states count confirmed and probable deaths, see this [article](https://www.nytimes.com/interactive/2020/06/19/us/us-coronavirus-covid-death-toll.htmlhttps://www.nytimes.com/interactive/2020/06/19/us/us-coronavirus-covid-death-toll.html).

* Dates

For each date, we show the cumulative number of confirmed cases and deaths as reported that day in that county or state. All cases and deaths are counted on the date they are first announced.

Each date includes all cases and deaths announced that day through midnight Eastern Time. As the West Coast and Hawaii tend to release all of their new data early enough in the day.

* Declining Counts

In some cases, the number of cases or deaths for a state or county will decline. This can occur when a state or county corrects an error in the number of cases or deaths they've reported in the past, or when a state moves cases from one county to another. When we are able, we will historically revise counts for all impacted dates. In other cases, this will be reflected in a single-day drop in the number of cases or deaths.

* Counties

In some instances, we report data from multiple counties or other non-county geographies as a single county. For instance, we report a single value for New York City, comprising the cases for New York, Kings, Queens, Bronx and Richmond Counties. In these instances the FIPS code field will be empty. (We may assign FIPS codes to these geographies in the future.) See the list of [geographic exceptions](#geographic-exceptions). 

Cities like St. Louis and Baltimore that are administered separately from an adjacent county of the same name are counted separately.

* “Unknown” Counties

Many state health departments choose to report cases separately when the patient’s county of residence is unknown or pending determination. In these instances, we record the county name as “Unknown.” As more information about these cases becomes available, the cumulative number of cases in “Unknown” counties may fluctuate.

Sometimes, cases are first reported in one county and then moved to another county. As a result, the cumulative number of cases may change for a given county.

### Geographic Exceptions

* New York

All cases for the five boroughs of New York City (New York, Kings, Queens, Bronx and Richmond counties) are assigned to a single area called New York City. The number of deaths in New York City also includes probable deaths reported by the New York City health department. Deaths are reported by county of residence, except for certain periods described below.

We have changed the way we have counted deaths in New York State a few times in response to changes in how the state and New York City report their data. See this [note](NEW-YORK-DEATHS-METHODOLOGY.md) for an explanation and timeline.

* Kansas City, Mo.

Four counties (Cass, Clay, Jackson and Platte) overlap the municipality of Kansas City, Mo. The cases and deaths that we show for these four counties are only for the portions exclusive of Kansas City. Cases and deaths for Kansas City are reported as their own line.

* Joplin, Mo.

Starting June 25, cases and deaths for Joplin are reported separately from Jasper and Newton counties. The cases and deaths reported for those counties are only for the portions exclusive of Joplin. Joplin cases and deaths previously appeared in the counts for those counties or as Unknown.

* Alameda County, Calif.

Counts for Alameda County include cases and deaths from Berkeley and the Grand Princess cruise ship.

* Douglas County, Neb.

Counts for Douglas County include cases brought to the state from the Diamond Princess cruise ship.

* Chicago

All cases and deaths for Chicago are reported as part of Cook County.

* Guam

Counts for Guam include cases reported from the USS Theodore Roosevelt.

* Puerto Rico

Data for Puerto Rico's county-equivalent municipios are available starting on May 5. This data was not available at the beginning of the outbreak and so all cases and deaths were assigned to Unknown. Puerto Rico does not report deaths at the municipio level.

#### Probable Cases and Deaths and Anomalies

For details on which individual state counts include probable cases and deaths and on anomalous days of data reporting, please see the list of individual state pages linked to from our [main tracking page](https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html).

## License and Attribution

In general, we are making this data publicly available for broad, noncommercial public use including by medical and public health researchers, policymakers, analysts and local news media.

If you use this data, you must attribute it to “The New York Times” in any publication. If you would like a more expanded description of the data, you could say “Data from The New York Times, based on reports from state and local health agencies.”

If you use it in an online presentation, we would appreciate it if you would link to our U.S. tracking page at [https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html](https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html).

If you use this data, please let us know at covid-data@nytimes.com.

See our [LICENSE](LICENSE) for the full terms of use for this data.

This license is co-extensive with the Creative Commons Attribution-NonCommercial 4.0 International license, and licensees should refer to that license ([CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/legalcode)) if they have questions about the scope of the license.


## Contact Us

If you have questions about the data or licensing conditions, please contact us at:

covid-data@nytimes.com


## Contributors

Mitch Smith, Karen Yourish, Sarah Almukhtar, Keith Collins, Danielle Ivory and Amy Harmon have been leading our U.S. data collection efforts.

Data has also been compiled by Jordan Allen, Jeff Arnold, Aliza Aufrichtig, Mike Baker, Nikhil Baradwaj, Anne Barnard, Robin Berjon, Matthew Bloch, Nicholas Bogel-Burroughs, Maddie Burakoff, Christopher Calabrese, Andrew Chavez, Robert Chiarito, Carmen Cincotti, Alastair Coote, Matt Craig, Avery Dews, John Eligon, Tiff Fehr, Andrew Fischer, Matt Furber, Ariana Giorgi, Rich Harris, Barbara Harvey, Lauryn Higgins, Jake Holland, Will Houp, Jon Huang, Danya Issawi, Jacob LaGesse, Alex Lim, Bea Malsky, Hugh Mandeville, Ilana Marcus, Alex Matthews, Patricia Mazzei, Allison McCann, Jesse McKinley, Miles McKinley, Sarah Mervosh, Andrea Michelson, Blacki Migliozzi, Steven Moity, Dylan Momplaisir, Richard A. Oppel Jr., Jugal K. Patel, Nina Pavlich, Azi Paybarah, Sean Plambeck, Carrie Price, Scott Reinhard, Thomas Rivas, James G. Robinson, Michael Robles, Alison Saldanha, Alex Schwartz, Libby Seline, Shelly Seroussi, Rachel Shorey, Anjali Singhvi, Charlie Smart, Ben Smithgall, Steven Speicher, Michael Strickland, Albert Sun, Thu Trinh, Tracey Tully, Maura Turcotte, Bella Virgilio, Miles Watkins, Phil Wells, Jeremy White, Josh Williams, Jin Wu and Yanxing Yang.
>>>>>>> upstream/master
