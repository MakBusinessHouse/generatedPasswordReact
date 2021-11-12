import React, { useState } from 'react'
import { upperCaseLetters, lowerCaseLetters, specialCharacters, numbers } from './character.js'
import { toast, ToastContainer } from 'react-toastify'
import { COPY_SUCCESS, MUST_SELECT, NOTHING_TO_COPY } from './message.js'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setpasswordLength] = useState('20')
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includelowerCase, setIncludelowerCase] = useState(false)
  const [includeNumber, setIncludeNumber] = useState(false)
  const [includesymbol, setIncludesymbol] = useState(false)

  const handleGeneratePassword = (e) => {

		if(!includeUpperCase && !includelowerCase &&!includesymbol &&!includeNumber) {
			notify(MUST_SELECT, true)
		}

    let characterList = '';
    if(includeUpperCase) {
      characterList = characterList + upperCaseLetters
    }
    if(includelowerCase) {
      characterList = characterList + lowerCaseLetters
    }
    if(includesymbol) {
      characterList = characterList + numbers
    }
    if(includeNumber) {
      characterList = characterList + specialCharacters
    }
     setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = (e) => {
		const newTextArea = document.createElement('textarea')
		newTextArea.innerText = password
		document.body.appendChild(newTextArea)
		newTextArea.select()
		document.execCommand('copy')
		newTextArea.remove()
	}

	const notify = (message, hasError = false) => {
		if(hasError) {
			toast.error(message, {
			position: "top-center",
			autoclose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			})
		}	else {
			toast(message, {
			position: "top-center",
			autoclose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			})
		}
	}

  const handleCopyPassword = (e) => {
		if(password === '') {
			notify(NOTHING_TO_COPY, true)
		}	else {
	    copyToClipboard()
			notify(COPY_SUCCESS)
		}
  }

	return (
		<div className='App'>
			<div className='container'>
				<div className='generator'>
					<h2 className='generator__header'>Password Generator</h2>
					<div className='generator__password'>
						<h2>{password}</h2>
						<button onClick={handleCopyPassword} className='copy__btn'>
							<i className='far fa-clipboard'></i>
						</button>
					</div>
					<div className='form-group'>
						<label htmlFor='password-lenght'>Password Lenght</label>
						<input
              defaultValue={passwordLength}
              onChange={(e) => setpasswordLength(e.target.value)}
							type='number'
							id='password-lenght'
							name='password-lenght'
              min="8"
              max="20"
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='upperCase-letters'>Include UpperCase Letter</label>
						<input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
							type='checkbox'
							id='upperCase-letters'
							name='upperCase-letters'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='lowercase-letters'>Include Lowercase Letter</label>
						<input
              checked={includelowerCase}
              onChange={(e) => setIncludelowerCase(e.target.checked)}
              type='checkbox'
							id='lowercase-letters'
							name='lowercase-letters'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='include-numbers'>Include Numbers</label>
						<input
              checked={includeNumber}
              onChange={(e) => setIncludeNumber(e.target.checked)}
							type='checkbox'
							id='include-numbers'
							name='include-numbers'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='lowercase-symbols'>Include Symbols</label>
						<input
              checked={includesymbol}
              onChange={(e) => setIncludesymbol(e.target.checked)}
							type='checkbox'
							id='lowercase-symbols'
							name='lowercase-symbols'
						/>
					</div>
					<button onClick={handleGeneratePassword} className='generator__password'>Generate Password</button>
					<ToastContainer
						position="top-center"
						autoclose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
