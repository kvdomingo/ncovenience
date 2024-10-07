import { Image } from "cloudinary-react";
import {
  MDBContainer as Container,
  MDBFooter as Footer,
  MDBIcon as Icon,
  MDBTypography as Typography,
} from "mdbreact";

function Foot() {
  return (
    <Footer className="bg-dark pt-5 text-center font-small text-light">
      <Container fluid className="py-3 text-center">
        <a href="https://kvd.studio" className="d-block">
          <Image
            cloudName="kdphotography-assets"
            publicId="logo/logo-white"
            height="30"
            alt="KVD logo"
          />
        </a>
        <a href="mailto:hello@kvd.studio" className="d-block my-2">
          hello@kvd.studio
        </a>
        <br />
        <div className="my-1">
          {/* @ts-ignore */}
          <Typography tag="h4" variant="h4-responsive" className="d-inline">
            <a
              className="mx-2"
              href="https://linkedin.com/in/kvdomingo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon fab icon="linkedin" size="2x" />
            </a>
          </Typography>
          {/* @ts-ignore */}
          <Typography tag="h4" variant="h4-responsive" className="d-inline">
            <a
              className="mx-2"
              href="https://github.com/kvdomingo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon fab icon="github" size="2x" />
            </a>
          </Typography>
        </div>
      </Container>
      <div className="footer-copyright py-4 text-center">
        &copy; 2020-{new Date().getFullYear()}{" "}
        <a href="mailto:hello@kvd.studio">Kenneth V. Domingo</a>
      </div>
    </Footer>
  );
}

export default Foot;
