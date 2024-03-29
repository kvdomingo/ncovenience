import { Image } from "cloudinary-react";
import { MDBContainer as Container, MDBFooter as Footer, MDBIcon as Icon, MDBTypography as Type } from "mdbreact";

function Foot() {
  return (
    <Footer className="font-small bg-dark text-light pt-5 text-center">
      <Container fluid className="text-center py-3">
        <a href="https://kvdomingo.xyz" className="d-block">
          <Image cloudName="kdphotography-assets" publicId="logo/logo-white" height="30" alt="KVD logo" />
        </a>
        <a href="mailto:hello@kvdomingo.xyz" className="d-block my-2">
          hello@kvdomingo.xyz
        </a>
        <br />
        <div className="my-1">
          <Type tag="h4" variant="h4-responsive" className="d-inline">
            <a className="mx-2" href="https://linkedin.com/in/kvdomingo" target="_blank" rel="noopener noreferrer">
              <Icon fab icon="linkedin" size="2x" />
            </a>
          </Type>
          <Type tag="h4" variant="h4-responsive" className="d-inline">
            <a className="mx-2" href="https://github.com/kvdomingo" target="_blank" rel="noopener noreferrer">
              <Icon fab icon="github" size="2x" />
            </a>
          </Type>
        </div>
      </Container>
      <div className="footer-copyright text-center py-4">
        &copy; {new Date().getFullYear()} <a href="mailto:hello@kvdomingo.xyz">Kenneth V. Domingo</a>
      </div>
    </Footer>
  );
}

export default Foot;
