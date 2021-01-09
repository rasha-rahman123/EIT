import { useContext, useEffect, useState } from "react";
import { Box, Button, Text } from "rebass";
import Router from "next/router";
import firebase from "firebase";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import Modal from 'react-modal'
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: 10,
    boxShadow: "0px 0px 3px #00000040, 0px 0px 20px #00000015",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    zIndex: 20,
    background: "rgba(255, 255, 255,1)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");
const Login = () => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [name, setName] = useState();
  const [modalOpen, setModalOpen] = useState()
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [dob, setDob] = useState(2008);
  const authContext = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    authContext.login(email, pass);
  };

  useEffect(() => {
    token && Router.push("/home");
  }, [token]);

  const weakPass = () => toast("Password not strong enough");
  const handlePassReset = async () => {
    if(email.length === 0){
      return alert('Please enter email first')
    }
    var auth = firebase.auth();
var emailAddress = email;
auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
setModalOpen(false)
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(pass)) {
      setLoading(false);
      return weakPass();
    }
    if (pass !== passConfirm) {
      return alert("Passwords must match");
    }
    await setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        authContext.setUser(userCredential);
        const db = firebase.firestore();
        db.collection("Users")
          .doc(userCredential.user.uid)
          .set({
            email: email,
            displayName:
              name + fname + "#" + userCredential.user.uid.substr(0, 6),
            dob: dob,
            firstName: name,
            lastName: fname
          })
          .then(() => {
            setLoading(false);
            var user = firebase.auth().currentUser;

            Router.push({ pathname: "/home" });
          })
          .catch((error) => {
            console.log(error.message);
            setLoading(false);
            alert(error.message);
          });
      });
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minHeight: "100vh",
        bg: "rgba(255, 255, 255,0.2)",
        pt: 6,
        color: '#2c2c2e'
      }}
    >
      <Box
        as="form"
        onSubmit={(e) => (register ? handleSignUp(e) : handleSubmit(e))}
        sx={{ p: 3, px: 4 }}
      >
        <Text fontSize={3} fontWeight={800} sx={{pl: '10%'}}>{register ? "JOIN EIT" : "WELCOME BACK TO EIT"}</Text>
        {register && (
          <>
            <Box my={3} display={"flex"} sx={{ flexDirection: "column" }}>
              <Text
                fontSize={18}
                sx={{ fontWeight: 800, opacity: 0.6, pl: "10%" }}
              >
                FIRST NAME*
              </Text>
              <Box
                as="input"
                sx={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #2c2c2e",
                  width: "80%",
                  fontSize: 24,
                  alignSelf: "center",
                  color: '#2c2c2e'
                }}
                value={name}
                required
                type="text"
                
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box my={3} display={"flex"} sx={{ flexDirection: "column" }}>
              <Text
                fontSize={18}
                sx={{ fontWeight: 800, opacity: 0.6, pl: "10%" }}
              >
                LAST NAME*
              </Text>
              <Box
                as="input"
                sx={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #2c2c2e",
                  width: "80%",
                  fontSize: 24,
                  alignSelf: "center",
                  color: '#2c2c2e'
                }}
                value={fname}
                required
                type="text"
                
                onChange={(e) => setFName(e.target.value)}
              />
            </Box>
            <Box my={3} display={"flex"} sx={{ flexDirection: "column" }}>
              <Text fontSize={18} sx={{ fontWeight: 800, opacity: 0.6, pl: '10%' }}>
                YEAR OF BIRTH*
              </Text>
              <Box
                as="select"
                required
                sx={{
                  background: "none",
                  border: "none",
                  width: "80%",
                  alignSelf: 'center',
                  fontSize: 24,
                  color: '#2c2c2e',
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 3,
                }}
                onChange={(e) => setDob(e.target.value)}
              >
                {new Array(100)
                  .fill(0)
                  .map((x, i) => i)
                  .reverse()
                  .map((x) => (
                    <Box as="option">{x + 1909}</Box>
                  ))}
              </Box>
            </Box>
          </>
        )}
    <Box my={3} mt={4} display={"flex"} sx={{ flexDirection: "column" }}>
          <Text fontSize={18} sx={{ fontWeight: 800, opacity: 0.6, pl: '10%' }}>
            EMAIL ADDRESS{register && '*'}
          </Text>
          <Box
            as="input"
            sx={{
              ":focus":{background: 'none', outline: 'none'},
              background: "transparent",
              border: "none",
              borderBottom: "1px solid #2c2c2e",
              width: "80%",
              fontSize: 24,
              color: '#2c2c2e',
              alignSelf: 'center'
            }}
            value={email}
            type="email"
            required
           
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box display={"flex"} sx={{ flexDirection: "column" }}>
          <Text fontSize={18} sx={{ fontWeight: 800, opacity: 0.6, pl: '10%' }}>
            PASSWORD{register && '*'}
          </Text>
          <Box
            as="input"
            sx={{
              background: "none",
              border: "none",
              borderBottom: "1px solid #2c2c2e",
              width: "80%",
              fontSize: 24,
              color: '#2c2c2e',
              alignSelf: 'center'
            }}
            required
            value={pass}
            type="password"
            
            onChange={(e) => setPass(e.target.value)}
          />
          {register && (
            <>
              {" "}
              <Text fontSize={18} sx={{ fontWeight: 800, opacity: 0.6, pl: '10%' }}>
           CONFIRM PASSWORD*
              </Text>
              <Box
                as="input"
                sx={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #2c2c2e",
                  width: "80%",
                  fontSize: 24,
                  color: '#2c2c2e',
                  alignSelf: 'center'
                }}
                required
                value={passConfirm}
                type="password"
                
                onChange={(e) => setPassConfirm(e.target.value)}
              />
            </>
          )}
        </Box>
        {!register && (
          <Text onClick={() => setModalOpen(true)}
            sx={{
              color: "#3AACFF",
              pl: '10%',
              pt: 1,
              ":hover": { textDecoration: "underline", cursor: "pointer" },
            }}
          >
            Forgot password?
          </Text>
        )}
    <Modal
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              style={customStyles}
              contentLabel="Congrats!"
            ><form style={{display: 'flex', flexDirection: 'column'}} onClick={() => handlePassReset()}><label>ENTER EMAIL </label><input style={{marginBottom: 3}} value={email} onChange={e => setEmail(e.target.value)} /><Button onClick={()=> handlePassReset()} sx={{bg: 'brayyy', maxHeight: 40, margin: 'auto 0'}}>SEND RESET PASS EMAIL</Button></form></Modal>{" "}
        <Box
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Loading width={314} height={70} />
          ) : (
            <Button
              sx={{
                width: '80%',
                height: 50,
                borderRadius: 30,
                background: "#2c2c2e",
                color: "white",
                fontSize: 18,
              }}
              type="submit"
            >
              Enter
            </Button>
          )}
          <Text onClick={() => setRegister(!register)} sx={{cursor: 'pointer', ":hover":{textDecoration: 'underline'} }} mt={2}>
            {register
              ? "Already signed up? Click here to login"
              : "No account? Click here to sign up"}
          </Text>
          <ToastContainer />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
