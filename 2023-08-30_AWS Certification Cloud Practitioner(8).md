
### IAM MFA 개요

1. 개인정보 보호 방어 메커니즘

	AWS에서 개인정보(개인, 그룹 등) 보호 방어 메커니즘에는 두가지 방법이 있다.


	1 비밀번호 정책 정의

		- 비밀번호가 강력할 수록 계정의 보안이 철저해진다.
		- 비밀번호 정책 옵션
			- 비밀번호 최소 길이
			- 특정 유형의 글자(대문자, 소문자, 숫자, 특수문자 등)
			- 사용자들의 비밀번호 변경 허용/금지
			- 비밀번호 만료 기간 설정
			- 비밀번호 변경시 기존 비밀번호 사용 금지
		- 비밀번호 정책으로 무작위공격(브루트포스) 등에 대한 해킹을 막아낼 수 있다.

	2 MFA(Multi-Factor Authentication_**)**_

		- 비밀번호 이외의 보안장치를 같이 사용하는 것
		- 비밀번호를 해킹 당해도 해커가 물리적인 보안장치를 가지고 있지 않은 이상 계정을 침해당하지 않는다.
		- MFA 장치 옵션
			- 가상MFA장치(Virtual MFA device)
				- 구글 OTP(Google Authenticator), Authy 등 어플리케이션으로 사용 가능하다
			- 범용 두번재 인자(Universal 2nd Factor(U2F) Security Key)
				- Yubico 사의 Yubikey(USB형 물리적 디바이스)
			- 하드웨어 키 팝(Hardware Key Fob MFA device)
				- Hemalto 사의 OTP 기기
			- 미국 정부 하드웨어 키 팝(Hardware Key Fob MFA device for AWS GovCloud)
				- SurePassID 사의 OTP 기기

### IAM MFA 실습

1. 비밀번호 정책

	비밀번호 정책 변경하기


	![“IAM” 서비스의 “계정 설정” 탭으로 접속 후 “편집” 버튼을 클릭한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/377b9613-e421-4cbe-86fa-87cea7bc5030/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=66e61976979b35fbe9d4023f816653af748a26c13532e27667ec771416c70226&X-Amz-SignedHeaders=host&x-id=GetObject)


	![“사용자 지정” 체크박스를 체크 후 원하는 비밀번호 정책을 설정하면 된다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0382ace7-abce-4ac6-b8ea-0b6a2a47cb42/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=f31f41f8cba163234b007d2053f4cc1e5cdd8dcf0b8c2d59e22185e4b00e55e9&X-Amz-SignedHeaders=host&x-id=GetObject)

2. MFA

	MFA 추가하기


	![로그인 한 계정의 “IAM” 서비스의 “대시보드” 탭으로 접속한 뒤 “MFA 추가” 버튼을 클릭한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e2e161c4-90a6-4b21-a910-dca5d190d055/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=1f774222a86cd438d767a5f7c53b95d9f0c78bc6326ffffb2a75c1c12434130e&X-Amz-SignedHeaders=host&x-id=GetObject)


	![새로운 창에서 위와 같은 화면이 보일 것 이며, “MFA 할당” 버튼을 클릭하여 MFA를 등록한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5931f339-e045-430c-97f1-28b5e0012b57/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=73e1d38d3399b3f4321cd9fe868575c0519901409b1a307196c68b9ac9238396&X-Amz-SignedHeaders=host&x-id=GetObject)


	![어플리케이션에서 표시 될 “디바이스 이름” 을 설정하고 “인증 관리자 앱” 을 체크 한 뒤 “다음” 버튼을 클릭하여 디바이스 탭으로 이동한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2388156b-52e8-42fe-bb0d-009dac6c3b44/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=6f76799bab511a1d336bb55e0ce7cdb022da8987c75b487475a76749bc1b2bad&X-Amz-SignedHeaders=host&x-id=GetObject)


	![“QR 코드 표시” 레이아웃을 클릭 하면 QR코드가 표시되며 해당 QR코드를 본인이 설치 한 MFA 어플리케이션에서 스캔 후 순차적으로 표시되는 MFA코드 두개를 연달아 입력 후 “MFA 추가” 버튼을 클릭하여 MFA 설정을 완료한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d8d18fc3-e36a-4f90-8b55-6db408a9e109/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=71d2ae66587821d485e42c5b405cad9df95851d27b41fb43d6a45b6c627a46c1&X-Amz-SignedHeaders=host&x-id=GetObject)


	![설정이 완료되면 위와 같은 녹색의 레이아웃이 표시 될 것이다. 이후로는 해당 계정으로 로그인 시 MFA 어플리케이션에 표시된 OTP번호를 입력 후 로그인 해야한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1d98bac0-3756-4a66-b10c-a9d837ceb979/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230830T105014Z&X-Amz-Expires=3600&X-Amz-Signature=c6bc6137b54838d379ac94129af7244413625d8a5f3209b35c6749616db86926&X-Amz-SignedHeaders=host&x-id=GetObject)

