import { Box, Text } from "rebass";
import Modal from "react-modal";
import { useState } from "react";
import { Input, Label, Textarea } from "theme-ui";
import ReCAPTCHA from "react-google-recaptcha";
import { Transition } from "react-transition-group";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: 30,
    boxShadow: "0px 0px 3px #00000040, 0px 0px 20px #00000015",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    alignItems: "center",
    zIndex: 20,
    background: "rgba(255, 255, 255,0.9)",
    transition: "all 300ms ease",
  },
};
Modal.setAppElement("#__next");
export const Footer = ({}) => {
  const [aboutModal, setAboutModal] = useState();
  const [formSent, setFormSent] = useState();
  const [contactModal, setContactModal] = useState();
  const [tosModal, setTOSModal] = useState();
  const [verified, setVerified] = useState();
  const [contactEmail, setContactEmail] = useState();
  const [contactMsg, setContactMsg] = useState();
  const [bigFooter, setBigFooter] = useState();
  return bigFooter ? (
    <Transition timeout={0} in={true}>
      {(status) => (
        <Text
          sx={{
            position: "absolute",
            py: 2,
            pt: 3,
           
            transition: 'all 300ms ease 1s',
            bottom: status === 'entered' ? 0 : -100,
            fontSize: 1,
            opacity: 0.6,
            fontWeight: 800,
            lineHeight: "100%",
            textAlign: "center",
            background: "#FFFFFF",
            width: "90vw",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Text
            onClick={() => setBigFooter(false)}
            sx={{
              position: "absolute",
              bottom: 20,
              right: 20,
              fontSize: 3,
              fontWeight: 800,
              opacity: 0.6,
              cursor: "pointer",
              ":hover": { opacity: 1 },
            }}
          >
            X
          </Text>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              ml: -50,
            }}
          >
            <Text>MADE W LOVE BY RASHA RAHMAN</Text>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text
              sx={{ cursor: "pointer" }}
              onClick={() => setAboutModal(true)}
            >
              About
            </Text>{" "}
            <Modal
              isOpen={aboutModal}
              onRequestClose={() => setAboutModal(false)}
              style={customStyles}
              contentLabel="About Page"
            >
              {" "}
              <Text
                fontSize={7}
                mt={2}
                fontWeight={800}
                lineHeight={"100%"}
                color={"brayyy"}
              >
                About EIT
              </Text>
              <Text fontSize={3} fontWeight={800} color={"brayyy"}>
                Currently, EIT is an open source mental health care app that
                focuses on CBT approaches to helping people feel better.
              </Text>
              <Text fontSize={2} fontWeight={800} color={"brayyy"}>
                My methods and approaches have not been studied by any
                profesional academy and I am trying to grow so that I can! These
                are just methods I believe would work based on hundreds of
                studies that I, as psychology student and on freetime, have
                encountered. These exercises are also based around transcripts
                of public CBT therapy sessions I have read on.
              </Text>
              <Text fontSize={2} fontWeight={800} color={"brayyy"}>
                As this is currently being built in my garage, I would love to
                get some more help with things but only feel comfortable doing
                so if I can pay, so for the time being, this is going to be a
                solo project!
              </Text>
              <Text fontSize={2} fontWeight={800} color={"brayyy"}>
                Still, feel free to leave any feedback and suggestions at the
                contact modal.
              </Text>
            </Modal>
            <Text
              sx={{ cursor: "pointer" }}
              onClick={() => setContactModal(true)}
            >
              Contact
            </Text>
            <Modal
              isOpen={contactModal}
              onRequestClose={() => setContactModal(false)}
              style={customStyles}
              contentLabel="Contact Page"
            >
              {" "}
              <Text
                fontSize={7}
                mt={2}
                fontWeight={800}
                lineHeight={"100%"}
                color={"brayyy"}
              >
                Contact
              </Text>
              <Text fontSize={2} fontWeight={800} color={"brayyy"}>
                If you have any comments, questions, or concerns
              </Text>
              {formSent ? (
                <Text>Thank you!</Text>
              ) : (
                <Box
                  as="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    verified && sendEmail(contactEmail, contactMsg);
                    setFormSent(true);
                  }}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Label>EMAIL</Label>
                  <Input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  <Label>MESSAGE</Label>
                  <Textarea
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    mb={2}
                  />
                  <ReCAPTCHA
                    sitekey={"6LdD9CYaAAAAAKJ_MscBpjZfnGbkzJ_-h-4ZcThX"}
                    onExpired={() => setVerified(false)}
                    onChange={() => setVerified(true)}
                  />
                  {verified ? (
                    <Button
                      sx={{
                        bg: "brayyy",
                        color: "white",
                        mt: 2,
                        alignSelf: "center",
                      }}
                      type="submit"
                    >
                      Send
                    </Button>
                  ) : (
                    <Label mt={2}>Please Complete Captcha</Label>
                  )}
                </Box>
              )}
            </Modal>
            <Text sx={{ cursor: "pointer" }} onClick={() => setTOSModal(true)}>
              Terms of Service
            </Text>
            <Modal
              isOpen={tosModal}
              onRequestClose={() => setTOSModal(false)}
              style={customStyles}
              contentLabel="TOS Page"
            >
              IN PROGRESS (BETA)
            </Modal>
          </Box>
        </Text>
      )}
    </Transition>
  ) : (
    <Text
      onClick={() => setBigFooter(true)}
      sx={{
        position: "absolute",
        py: 2,
        bottom: 0,
        fontSize: 1,
        opacity: 0.2,
        ":hover": { opacity: 0.8 },
        cursor: "pointer",
        fontWeight: 800,
        lineHeight: "100%",
        textAlign: "center",
        background: "#FFFFFF",
        width: "100px",
        borderRadius: "10px 10px 0 0",
      }}
    >
      Open Footer
    </Text>
  );
};

export default Footer;
