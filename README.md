bên BE: 

cvcontroller thêm API 
    /**
     * GET /api/v1/cvs/{id}
     * Lấy chi tiết CV theo ID của user đang đăng nhập
     */
    @GetMapping("/{id}")
    public ResponseEntity<ResCvDTO> getCvById(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        ResCvDTO data = cvService.getCvById(extractUserId(jwt), id);

        return ResponseEntity.ok(data);
    }

publicInterviewController thêm API :

    /**
     * GET /interview-schedules/applications/{applicationId}
     * Lấy danh sách lịch phỏng vấn của ứng viên trong đơn ứng tuyển này (yêu cầu đăng nhập)
     */
    @GetMapping("/applications/{applicationId}")
    public ResponseEntity<List<ResInterviewScheduleDTO>> getMyInterviews(
            @PathVariable Long applicationId,
            @AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        return ResponseEntity.ok(interviewService.getMyInterviews(userId, applicationId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResInterviewScheduleDTO> getMyInterviews(Long userId, Long applicationId) {
        Application application = applicationRepository.findByIdAndCandidateUserId(applicationId, userId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn ứng tuyển của bạn"));

        List<Interview> interviews = interviewRepository.findByApplicationIdAndDeletedAtIsNullOrderByRoundId(application.getId());

        return interviews.stream().map(i -> {
            InterviewRound round = i.getRound();
            return toScheduleResponse(i, round, application);
        }).toList();
    }



    /**
     * GET /interview-schedules/applications/{applicationId}/history
     * Lấy lịch sử phỏng vấn của ứng viên trong đơn ứng tuyển này (yêu cầu đăng nhập)
     */
    @GetMapping("/applications/{applicationId}/history")
    public ResponseEntity<ResInterviewHistoryDTO> getMyInterviewHistory(
            @PathVariable Long applicationId,
            @AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        return ResponseEntity.ok(interviewService.getMyInterviewHistory(userId, applicationId));
    }


     @Override
    @Transactional(readOnly = true)
    public ResInterviewHistoryDTO getMyInterviewHistory(Long userId, Long applicationId) {
        Application application = applicationRepository.findByIdAndCandidateUserId(applicationId, userId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn ứng tuyển của bạn"));

        List<InterviewRound> rounds = roundRepository
                .findByJobPostIdAndDeletedAtIsNullOrderByRoundNumberAsc(application.getJobPostId());

        List<Interview> interviews = interviewRepository
                .findByApplicationIdAndDeletedAtIsNullOrderByRoundId(applicationId);

        List<ResInterviewHistoryDTO.RoundHistory> roundHistories = new ArrayList<>();
        for (InterviewRound round : rounds) {
            ResInterviewHistoryDTO.RoundHistory.RoundHistoryBuilder builder = ResInterviewHistoryDTO.RoundHistory
                    .builder()
                    .roundNumber(round.getRoundNumber())
                    .roundName(round.getRoundName())
                    .isFinal(round.getIsFinal());

            Interview interview = interviews.stream()
                    .filter(i -> i.getRoundId().equals(round.getId()))
                    .findFirst().orElse(null);

            if (interview != null) {
                builder.scheduleId(interview.getId())
                        .scheduledAt(interview.getScheduledAt())
                        .interviewType(interview.getInterviewType())
                        .scheduleStatus(interview.getStatus());

                resultRepository.findByInterviewId(interview.getId()).ifPresent(result -> {
                    builder.result(result.getResult())
                            .rating(result.getRating())
                            .note(result.getNote())
                            .evaluatedAt(result.getEvaluatedAt());
                });
            }

            roundHistories.add(builder.build());
        }

        String candidateName = getCandidateName(application.getCandidateUserId());

        String cvUrl = cvsRepository.findById(application.getCvId())
                .map(cv -> cv.getFileUrl() != null ? cv.getFileUrl() : cv.getPdfUrl())
                .orElse(null);

        return ResInterviewHistoryDTO.builder()
                .applicationId(applicationId)
                .candidateName(candidateName)
                .currentStatus(application.getStatus())
                .cvUrl(cvUrl)
                .rounds(roundHistories)
                .build();
    }

    /**
     * GET /interview-schedules/interview-rounds/{roundId}
     * Lấy thông tin chi tiết 1 vòng phỏng vấn
     */
    @GetMapping("/interview-rounds/{roundId}")
    public ResponseEntity<ResInterviewRoundDTO> getRoundDetail(
            @PathVariable Long roundId) {
        return ResponseEntity.ok(interviewService.getRoundDetail(roundId));
    }


        @Override
    @Transactional(readOnly = true)
    public ResInterviewRoundDTO getRoundDetail(Long roundId) {
        InterviewRound round = roundRepository.findByIdAndDeletedAtIsNull(roundId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy vòng phỏng vấn"));
                
        return toRoundResponse(round);
    }

