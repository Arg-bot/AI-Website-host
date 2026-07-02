const http = require('http');

const firstNames = ['James','Mary','John','Patricia','Robert','Jennifer','Michael','Linda','William','Barbara','David','Susan','Richard','Jessica','Joseph','Sarah','Thomas','Karen','Charles','Lisa','Christopher','Nancy','Daniel','Betty','Matthew','Margaret','Anthony','Sandra','Mark','Ashley','Donald','Emily','Steven','Kimberly','Paul','Donna','Andrew','Carol','Joshua','Michelle','Kenneth','Amanda','Kevin','Dorothy','Brian','Melissa','George','Deborah','Timothy','Stephanie','Ronald','Rebecca','Edward','Sharon','Jason','Laura','Jeffrey','Cynthia','Ryan','Kathleen','Jacob','Amy','Gary','Angela','Nicholas','Shirley','Eric','Anna','Jonathan','Brenda','Stephen','Pamela','Larry','Emma','Justin','Nicole','Scott','Helen','Brandon','Samantha','Benjamin','Katherine','Samuel','Christine','Raymond','Debra','Gregory','Rachel','Frank','Carolyn','Alexander','Janet','Patrick','Catherine','Jack','Maria'];

const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts'];

const interests = ['AI Consulting','Machine Learning','Data Analytics','Natural Language Processing','Computer Vision','Robotic Process Automation','Predictive Analytics','Deep Learning','AI Strategy','Business Intelligence'];

const countries = ['United Kingdom','United States','Canada','Australia','Germany','France','India','Singapore','UAE','Netherlands','Ireland','Sweden','Norway','Denmark','New Zealand'];

const messages = [
  'I am interested in your AI consulting services and would like to know more about pricing.',
  'We need help implementing machine learning solutions for our business.',
  'Can you provide a demo of your data analytics platform?',
  'We are looking for NLP solutions for our customer service department.',
  'Interested in automating our business processes using RPA.',
  'We need predictive analytics for our sales forecasting.',
  'Looking for computer vision solutions for quality control.',
  'Can you help us develop an AI strategy for our company?',
  'We would like to integrate AI into our existing workflow.',
  'Please contact me regarding your deep learning services.',
  'Our company needs business intelligence tools. Can we schedule a call?',
  'We are a startup looking for affordable AI solutions.',
  'Can you provide case studies of your previous AI implementations?',
  'We need AI solutions for healthcare data analysis.',
  'Interested in your AI-powered chatbot solutions.'
];

const companies = ['TechCorp Ltd','Innovate Solutions','Digital Ventures','Future Systems','Smart Analytics','Data Driven Co','Global Tech','Nexus Innovations','Alpha Digital','Beta Solutions','Gamma Technologies','Delta Consulting','Epsilon AI','Zeta Systems','Eta Networks'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  return '07' + Math.floor(Math.random() * 900000000 + 100000000).toString().slice(0,9);
}

function postEnquiry(data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/enquiries',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = http.request(options, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(d));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function seed() {
  console.log('Inserting 250 dummy enquiries...');
  let success = 0;
  let failed = 0;
  for (let i = 0; i < 250; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    try {
      const result = await postEnquiry({
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random()*99)}@${randomItem(['gmail.com','yahoo.com','outlook.com','hotmail.com','company.co.uk'])}`,
        phone: randomPhone(),
        message: randomItem(messages),
        service: randomItem(interests),
        interest: randomItem(interests),
        country: randomItem(countries),
        company: randomItem(companies),
      });
      const parsed = JSON.parse(result);
      if (parsed.error || parsed.message?.includes('required')) {
        failed++;
        if (failed === 1) console.log('First failure response:', result);
      } else {
        success++;
        if (success % 25 === 0) console.log(`✅ Inserted ${success}/250`);
      }
   } catch (err) {
  console.log(`❌ Failed record ${i}:`, err.message || err);
}
  }
  console.log(`\n✅ Done! ${success} inserted, ${failed} failed.`);
  console.log('Check: http://localhost:3000/api/enquiries');
}

seed();
