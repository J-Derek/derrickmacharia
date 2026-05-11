const fs = require('fs');
let p = fs.readFileSync('derek-portfolio/src/pages/ProjectDetail.jsx', 'utf8');
p = p.replace(/import \{ ArrowLeft, ArrowRight, Github, ExternalLink \} from 'lucide-react';/g, "import { ArrowLeft, ArrowRight, Github, ExternalLink } from 'lucide-react';");
fs.writeFileSync('derek-portfolio/src/pages/ProjectDetail.jsx', p);

let c = fs.readFileSync('derek-portfolio/src/components/Contact.jsx', 'utf8');
c = c.replace(/import \{ Copy, Check, Github, Linkedin, MessageSquare \} from 'lucide-react';/g, "import { Copy, Check, Github, Linkedin, MessageSquare } from 'lucide-react';");
fs.writeFileSync('derek-portfolio/src/components/Contact.jsx', c);
