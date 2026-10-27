# 달빛 시계공방 · 한밤의 방어전

최대공약수로 포탑 부품을 만들고 최소공배수로 광역 장치를 충전하는 8개 챕터의 턴 방식 디펜스 게임입니다.

- 세 통로에 포탑 설치·강화, 한정된 톱니로 수리/회수 선택
- 매 턴 적 등장 → 가장 가까운 적 공격 → 적 이동. 내구도 0은 패배
- 일반 적 처치 톱니 1, 보스 3. 광역 폭발은 피해 6과 1턴 정지
- 모든 공약수로 제작할 수 있지만 최대공약수가 공격력 3. 공격력 환산은 게임 규칙이며 수학 정의와 구분합니다.
- 별은 방어 성공, 내구도6이상, 최대공약수 제작+최소공배수 충전으로 각각1개. 최고 기록을 로컬 저장

Node.js 22 이상, 외부 패키지 없이 npm start / npm test / npm run build. 빌드 결과는 dist/입니다.

Vercel에서 이 저장소를 Import하세요. Framework Other, Build npm run build, Output dist. vercel.json에 설정되어 있습니다. GitHub 연동 후 main 푸시가 배포를 갱신합니다. 실제 배포 주소는 Vercel이 확정하며 주소를 추측하지 않습니다. build-info.json으로 배포 커밋을 확인할 수 있습니다.

모든 주요 사물은 내장 image_gen 원본입니다: workshop.png(배경), keeper.png(조수), turret.png(포탑), bug.png(적), boss.png(보스), rewards-atlas.png(톱니/수정). 프롬프트는 assets/prompts.json. 보상 시트 상단의 대체 적 시안은 사용하지 않습니다.

sources.json에 교과서 쪽수와 개념이 있습니다. 원문 PDF/추출문/교과서 도판은 포함하지 않습니다. tests/battle.test.mjs는 독립 약수·배수 열거와 전 챕터 승리 전략, 실제 패배와 재화 상태를 확인합니다. 브라우저 증거는 evidence/에 보존합니다. 학생 대상 재미/효과 검증은 아직 하지 않았습니다.

